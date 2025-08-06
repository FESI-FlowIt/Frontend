'use client';

import { useEffect, useState } from 'react';
import { scheduleMapper } from '@/api/mapper/scheduleMapper';
import { schedulesApi } from '@/api/scheduleApi';
import type { AssignedTask, SaveScheduleRequest, Task } from '@/interfaces/schedule';
import dayjs from '@/lib/dayjs';

export function useScheduleTasks({
  isOpen,
  initialDate,
  externalAssigned,
  setExternalAssigned,
  onClose,
  onSaved,
}: {
  isOpen: boolean;
  initialDate: string;
  externalAssigned: AssignedTask[];
  setExternalAssigned: React.Dispatch<React.SetStateAction<AssignedTask[]>>;
  onSaved: (updated: AssignedTask[], changedDates: string[]) => void;
  onClose: () => void;
}) {
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [removedTasks, setRemovedTasks] = useState<AssignedTask[]>([]);
  const [localChanges, setLocalChanges] = useState(new Set<string>());

  const fetchUnassignedTasks = async (date: string) => {
    try {
      const res = await schedulesApi.getUnassignedTodos(date);
      const mapped = scheduleMapper.mapUnassignedTodosToTasks(res.unassignedTodos);
      setTasks(mapped);
    } catch (err) {
      console.error('미배치 할 일 불러오기 실패:', err);
    }
  };

  const fetchAssignedTasksByDate = async (date: string) => {
    try {
      const res = await schedulesApi.getAssignedTodos(date);
      const mapped = scheduleMapper.mapAssignedTodosToAssignedTasks(res.assignedTodos);
      setExternalAssigned(prev => {
        const filtered = prev.filter(task => task.date !== date);
        return [...filtered, ...mapped];
      });
    } catch (err) {
      console.error(`${date} 일정 불러오기 실패:`, err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(initialDate);
    }
  }, [isOpen, initialDate]);

  useEffect(() => {
    if (isOpen && selectedDate && !localChanges.has(selectedDate)) {
      fetchUnassignedTasks(selectedDate);
      fetchAssignedTasksByDate(selectedDate);
    }
  }, [isOpen, selectedDate]);

  useEffect(() => {
    setAssignedTasks(
      externalAssigned.filter(task =>
        task.date === selectedDate &&
        !removedTasks.some(r =>
          r.task.id === task.task.id && r.time === task.time && r.date === task.date
        )
      )
    );
  }, [externalAssigned, selectedDate, removedTasks]);

  const handlePrevDate = () => {
    setSelectedDate(prev => dayjs(prev).subtract(1, 'day').format('YYYY-MM-DD'));
  };

  const handleNextDate = () => {
    setSelectedDate(prev => dayjs(prev).add(1, 'day').format('YYYY-MM-DD'));
  };

  const handleDrop = (taskId: string, time: string, date: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const dup = externalAssigned.some(a => a.task.id === task.id && a.time === time && a.date === date);
    if (dup) return;

    const newTask: AssignedTask = { task, time, date };

    setAssignedTasks(prev => [...prev, newTask]);
    setExternalAssigned(prev => [...prev, newTask]);
    setRemovedTasks(prev => prev.filter(a => !(a.task.id === task.id && a.time === time && a.date === date)));
    setLocalChanges(prev => new Set(prev).add(date));
  };

  const handleDelete = (task: Task, time: string, date: string) => {
    setAssignedTasks(prev => prev.filter(a => !(a.task.id === task.id && a.time === time && a.date === date)));
    const matched = externalAssigned.find(a => a.task.id === task.id && a.time === time && a.date === date);
    if (matched) setRemovedTasks(prev => [...prev, matched]);
    setLocalChanges(prev => new Set(prev).add(date));
  };

  const handleCancel = () => {
    setAssignedTasks(
      externalAssigned.filter(task =>
        task.date === selectedDate &&
        !removedTasks.some(r =>
          r.task.id === task.task.id && r.time === task.time && r.date === task.date
        )
      )
    );
    setRemovedTasks([]);
    setLocalChanges(new Set());
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
    const changedDates = new Set([
      ...assignedTasks.map(task => task.date),
      ...removedTasks.map(task => task.date),
    ]);

    const allCurrent = externalAssigned.filter(task => !changedDates.has(task.date)).concat(assignedTasks);
    const dedup = getDeduplicatedTasks(allCurrent);

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
        ...removedTasks.map(({ schedId, task, time, date }) => ({
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
        new Set([...dedup.map(task => task.date), ...removedTasks.map(task => task.date)])
      );

      setExternalAssigned(prev => {
        const filtered = prev.filter(task => !changedDates.includes(task.date));
        return [...filtered, ...dedup];
      });

      onSaved([...dedup], changedDates);
      setRemovedTasks([]);
      setLocalChanges(new Set());
      onClose();
    } catch (err) {
      console.error('❌ 일정 저장 실패:', err);
    }
  };

  return {
    assignedTasks,
    tasks,
    selectedDate,
    handlePrevDate,
    handleNextDate,
    handleDrop,
    handleDelete,
    handleCancel,
    handleSave,
  };
}
