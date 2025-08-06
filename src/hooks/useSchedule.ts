'use client';

import { useState } from 'react';
import dayjs from '@/lib/dayjs';

import { schedulesApi } from '@/api/scheduleApi';
import { scheduleMapper } from '@/api/mapper/scheduleMapper';
import type { AssignedTask, Task, SaveScheduleRequest } from '@/interfaces/schedule';

interface UseScheduleTasksProps {
  initialDate: string;
  externalAssigned: AssignedTask[];
  setExternalAssigned: React.Dispatch<React.SetStateAction<AssignedTask[]>>;
  onSaved: (updated: AssignedTask[], changedDates: string[]) => void;
  onClose: () => void;
}

export function useScheduleTasks({
  initialDate,
  externalAssigned,
  setExternalAssigned,
  onSaved,
  onClose,
}: UseScheduleTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchUnassignedTasks = async (date: string) => {
    try {
      const res = await schedulesApi.getUnassignedTodos(date);
      const mapped = scheduleMapper.mapUnassignedTodosToTasks(res.unassignedTodos);
      setTasks(mapped);
    } catch {}
  };

  const fetchAssignedTasksByDate = async (date: string) => {
    const alreadyAssigned = externalAssigned.some(task => task.date === date);
    if (alreadyAssigned) return;

    try {
      const res = await schedulesApi.getAssignedTodos(date);
      const mapped = scheduleMapper.mapAssignedTodosToAssignedTasks(res.assignedTodos);

      setExternalAssigned(prev => {
        const filtered = prev.filter(task => task.date !== date);
        return [...filtered, ...mapped];
      });
    } catch {}
  };

  const handleDrop = (taskId: string, time: string, date: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const dup = externalAssigned.some(
      a => a.task.id === task.id && a.time === time && a.date === date,
    );
    if (dup) return;

    setExternalAssigned(prev => [...prev, { task, time, date }]);
  };

  const handleDelete = (task: Task, time: string, date: string) => {
    setExternalAssigned(prev =>
      prev.filter(a => !(a.task.id === task.id && a.time === time && a.date === date)),
    );
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
    const dedup = getDeduplicatedTasks(externalAssigned);

    const removed = externalAssigned.filter(
      prev =>
        prev.schedId !== undefined &&
        !dedup.some(
          curr =>
            curr.task.id === prev.task.id &&
            curr.time === prev.time &&
            curr.date === prev.date,
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
        ...removed.map(({ schedId, task, time, date }) => ({
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

      const changedDates = Array.from(
        new Set([...dedup.map(task => task.date), ...removed.map(task => task.date)]),
      );

      setExternalAssigned(prev => {
        const filtered = prev.filter(task => !changedDates.includes(task.date));
        return [...filtered, ...dedup];
      });

      onSaved([...dedup], changedDates);
      onClose();
    } catch {}
  };

  return {
    tasks,
    assignedTasks: externalAssigned,
    fetchUnassignedTasks,
    fetchAssignedTasksByDate,
    handleDrop,
    handleDelete,
    handleSave,
  };
}
