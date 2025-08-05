'use client';

import { useEffect, useState } from 'react';
import dayjs from '@/lib/dayjs';

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
  selectedDate: string;
  onSaved: (updated: AssignedTask[]) => void; // ✅ 추가됨
}

export default function ScheduleModal({
  isOpen,
  onClose,
  assignedTasks: externalAssigned,
  setAssignedTasks: setExternalAssigned,
  selectedDate,
  onSaved, // ✅ 추가됨
}: ScheduleModalProps) {
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (isOpen) {
      setAssignedTasks([...externalAssigned]);
      fetchUnassignedTasks();
    }
  }, [isOpen, externalAssigned, selectedDate]);

  const fetchUnassignedTasks = async () => {
    try {
      const res = await schedulesApi.getUnassignedTodos(selectedDate);
      const mapped = scheduleMapper.mapUnassignedTodosToTasks(res.unassignedTodos);
      setTasks(mapped);
    } catch (err) {
      console.error('미배치 할 일 불러오기 실패:', err);
    }
  };

  const handleDrop = (taskId: string, time: string, date: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const dup = assignedTasks.some(a => a.time === time && a.date === date);
    if (dup) return;

    setAssignedTasks(prev => [...prev, { task, time, date }]);
  };

  const handleDelete = (task: Task, time: string, date: string) => {
    setAssignedTasks(prev =>
      prev.filter(a => !(a.task.id === task.id && a.time === time && a.date === date)),
    );
  };

  const handleCancel = () => {
    setAssignedTasks(externalAssigned);
    onClose();
  };

  const getDeduplicatedTasks = (list: AssignedTask[]): AssignedTask[] => {
    const map = new Map<string, AssignedTask>();
    list.forEach(item => {
      const key = `${item.task.id}-${item.time}-${item.date}`;
      if (!map.has(key)) map.set(key, item);
    });
    return Array.from(map.values());
  };

  const toLocalISOString = (dateStr: string, timeStr: string): string => {
    return dayjs.tz(`${dateStr}T${timeStr}:00`, 'Asia/Seoul').format('YYYY-MM-DDTHH:mm:ss');
  };

  const handleSave = async () => {
    const dedup = getDeduplicatedTasks(assignedTasks);

    const removed = externalAssigned.filter(
      prev =>
        prev.schedId &&
        !assignedTasks.some(
          curr =>
            curr.task.id === prev.task.id && curr.time === prev.time && curr.date === prev.date,
        ),
    );

    const payload: SaveScheduleRequest = {
      scheduleInfos: [
        ...dedup.map(({ schedId, task, time, date }) => {
          const base = {
            todoId: Number(task.id),
            startedDateTime: toLocalISOString(date, time),
            endedDateTime: toLocalISOString(date, time),
            isRemoved: false,
          };
          return schedId !== undefined ? { ...base, schedId } : base;
        }),
        ...removed
          .filter(({ schedId }) => schedId !== undefined)
          .map(({ schedId, task, time, date }) => ({
            schedId: schedId!,
            todoId: Number(task.id),
            startedDateTime: toLocalISOString(date, time),
            endedDateTime: toLocalISOString(date, time),
            isRemoved: true,
          })),
      ],
    };

    try {
      await schedulesApi.saveSchedules(payload);

      const dedupWithoutRemoved = dedup.filter(
        d =>
          !removed.some(
            r => Number(r.task.id) === Number(d.task.id) && r.time === d.time && r.date === d.date,
          ),
      );

      // ✅ 외부에 최신 반영
      setExternalAssigned(dedupWithoutRemoved);
      onSaved(dedupWithoutRemoved); // 💡 부모 컴포넌트 반영
      onClose();
    } catch (error) {
      console.error('❌ 일정 저장 실패:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} size="schedule" padding="none" rounded="schedule">
      <div className="flex h-full w-full flex-col">
        <ScheduleHeader onClose={handleCancel} />
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
