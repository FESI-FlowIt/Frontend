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
  onClose: (saved?: boolean) => void;
  assignedTasks: AssignedTask[];
  setAssignedTasks: React.Dispatch<React.SetStateAction<AssignedTask[]>>;
  selectedDate: string; // "YYYY-MM-DD"
}

export default function ScheduleModal({
  isOpen,
  onClose,
  assignedTasks: externalAssigned,
  setAssignedTasks: setExternalAssigned,
  selectedDate,
}: ScheduleModalProps) {
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (isOpen) {
      setAssignedTasks(externalAssigned);
      fetchUnassignedTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, externalAssigned, selectedDate]);

  const fetchUnassignedTasks = async () => {
    try {
      // ✅ userId 제거
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
    onClose(false);
  };

  const getDeduplicatedTasks = (list: AssignedTask[]): AssignedTask[] => {
    const map = new Map<string, AssignedTask>();
    list.forEach(item => {
      const key = `${item.task.id}-${item.time}-${item.date}`;
      if (!map.has(key)) map.set(key, item);
    });
    return Array.from(map.values());
  };
  //한국 시간으로 수정해야함
  // const toLocalISOString = (dateStr: string, timeStr: string): string =>
  //dayjs.tz(`${dateStr}T${timeStr}`, 'Asia/Seoul').format('YYYY-MM-DDTHH:mm:ssZ');
  const toLocalISOString = (dateStr: string, timeStr: string): string => {
    return dayjs.tz(`${dateStr}T${timeStr}:00`, 'Asia/Seoul').format('YYYY-MM-DDTHH:mm:ss');
  };
  const handleSave = async () => {
    const merged = [...externalAssigned, ...assignedTasks];
    const dedup = getDeduplicatedTasks(merged);

    const removed = externalAssigned.filter(
      prev =>
        prev.schedId && // 🔴 schedId가 있는 것만 삭제 대상으로 인정
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
          .map(({ schedId, task, time, date }) => {
            return {
              schedId: schedId!, // ! 붙여도 안전함 (위에서 걸렀으니까)
              todoId: Number(task.id),
              startedDateTime: toLocalISOString(date, time),
              endedDateTime: toLocalISOString(date, time),
              isRemoved: true,
            };
          }),
      ],
    };

    console.log('🧩 externalAssigned:', externalAssigned);
    console.log('🧩 assignedTasks:', assignedTasks);
    console.log('📌 dedup:', dedup);
    console.log('❌ removed:', removed);
    console.log('📦 최종 payload:', payload);

    try {
      await schedulesApi.saveSchedules(payload);

      // ✅ 삭제된 일정 제외하고 반영
      const dedupWithoutRemoved = dedup.filter(
        d =>
          !removed.some(
            r => Number(r.task.id) === Number(d.task.id) && r.time === d.time && r.date === d.date,
          ),
      );

      // 🔽 이 줄 추가!!!
      setExternalAssigned(dedupWithoutRemoved);

      onClose(true);
    } catch (error) {
      console.error('❌ 일정 저장 실패:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(false)}
      size="schedule"
      padding="none"
      rounded="schedule"
    >
      <div className="flex h-full w-full flex-col">
        <ScheduleHeader onClose={() => onClose(false)} />
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
