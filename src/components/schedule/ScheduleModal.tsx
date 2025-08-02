'use client';

import { useEffect, useState } from 'react';

import Modal from '@/components/ui/Modal';
import type { AssignedTask, Task } from '@/interfaces/schedule';

import ScheduleFooter from './ScheduleFooter';
import ScheduleHeader from './ScheduleHeader';
import TimeTable from './TimeTable';
import UnassignedTaskList from './UnassignedTaskList';
import { schedulesApi } from '@/api/scheduleApi';
import { scheduleMapper } from '@/api/mapper/scheduleMapper';
import type { SaveScheduleRequest } from '@/interfaces/schedule';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignedTasks: AssignedTask[];
  setAssignedTasks: React.Dispatch<React.SetStateAction<AssignedTask[]>>;
  userId: number;
  selectedDate: string;
}

export default function ScheduleModal({
  isOpen,
  onClose,
  assignedTasks: externalAssigned,
  setAssignedTasks: setExternalAssigned,
  userId,
  selectedDate,
}: ScheduleModalProps) {
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (isOpen) {
      setAssignedTasks(externalAssigned);
      fetchUnassignedTasks();
    }
  }, [isOpen, externalAssigned, userId, selectedDate]);

  const fetchUnassignedTasks = async () => {
    try {
      const res = await schedulesApi.getUnassignedTodos(userId, selectedDate);
      const mapped = scheduleMapper.mapUnassignedTodosToTasks(res.unassignedTodos);
      setTasks(mapped);
    } catch (err) {
      console.error('미배치 할 일 불러오기 실패:', err);
    }
  };

  const handleDrop = (taskId: string, time: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // 해당 시간에 이미 배정된 할 일이 있다면 추가 금지
    const alreadyHasTaskInTimeSlot = assignedTasks.some(a => a.time === time);
    if (alreadyHasTaskInTimeSlot) return;

    setAssignedTasks(prev => [...prev, { task, time }]);
  };

  const handleDelete = (task: Task, time: string) => {
    setAssignedTasks(prev => prev.filter(a => a.task.id !== task.id || a.time !== time));
  };

  const handleCancel = () => {
    setAssignedTasks(externalAssigned);
  };

  const getDeduplicatedTasks = (tasks: AssignedTask[]): AssignedTask[] => {
    const map = new Map<string, AssignedTask>();
    tasks.forEach(task => {
      const key = `${task.task.id}-${task.time}`;
      if (!map.has(key)) {
        map.set(key, task);
      }
    });
    return Array.from(map.values());
  };

  const handleSave = async () => {
    const deduplicated = getDeduplicatedTasks(assignedTasks);

    const removedTasks = externalAssigned.filter(
      prev => !deduplicated.some(curr => curr.task.id === prev.task.id && curr.time === prev.time),
    );

    const payload: SaveScheduleRequest = {
      userId,
      scheduleInfos: [
        ...deduplicated.map(({ schedId, task, time }) => ({
          schedId, // 있을 경우 포함
          todoId: Number(task.id),
          startedDateTime: `${selectedDate}T${time}:00`,
          endedDateTime: `${selectedDate}T${time}:00`,
          isRemoved: false,
        })),
        ...removedTasks.map(({ schedId, task, time }) => ({
          schedId, // ✅ 삭제는 schedId 꼭 포함해야 함
          todoId: Number(task.id),
          startedDateTime: `${selectedDate}T${time}:00`,
          endedDateTime: `${selectedDate}T${time}:00`,
          isRemoved: true,
        })),
      ],
    };

    try {
      await schedulesApi.saveSchedules(payload);
      const res = await schedulesApi.getAssignedTodos(userId, selectedDate);
      const updated = scheduleMapper.mapAssignedTodosToAssignedTasks(res.assignedTodos);
      setExternalAssigned(updated);
      onClose();
    } catch (error) {
      console.error('일정 저장 실패:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="schedule" padding="none" rounded="schedule">
      <div className="flex h-full w-full flex-col">
        <ScheduleHeader onClose={onClose} />
        <div className="flex h-full w-full flex-col md:flex-row">
          <UnassignedTaskList tasks={tasks} />
          <TimeTable
            assignedTasks={assignedTasks}
            onDropTask={handleDrop}
            onDeleteTask={handleDelete}
          />
        </div>
        <ScheduleFooter onCancel={handleCancel} onSave={handleSave} />
      </div>
    </Modal>
  );
}
