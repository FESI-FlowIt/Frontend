'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import UnassignedTaskList from './UnassignedTaskList';
import TimeTable from './TimeTable';
import ScheduleHeader from './ScheduleHeader';

export type Task = {
  id: string;
  title: string;
  color: string;
};

export type AssignedTask = {
  task: Task;
  time: string;
};

const initialTasks: Task[] = [
  { id: '1', title: '개발', color: 'red' },
  { id: '2', title: '알고리즘', color: 'yellow' },
  { id: '3', title: '기획', color: 'green' },
];

export default function ScheduleModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [unassignedTasks, setUnassignedTasks] = useState<Task[]>(initialTasks);
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);

  const handleDrop = (taskId: string, time: string) => {
    const task = unassignedTasks.find(t => t.id === taskId);
    if (task && !assignedTasks.some(a => a.task.id === taskId && a.time === time)) {
      setAssignedTasks(prev => [...prev, { task, time }]);
      setUnassignedTasks(prev => prev.filter(t => t.id !== taskId));
    }
  };

  const handleDelete = (task: Task, time: string) => {
    setAssignedTasks(prev => prev.filter(a => a.task.id !== task.id || a.time !== time));
    setUnassignedTasks(prev => [...prev, task]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="schedule" padding="none" rounded="schedule">
      <div className="flex h-full w-full flex-col">
        <ScheduleHeader onClose={onClose} />

        <div className="flex h-full w-full">
          <UnassignedTaskList tasks={unassignedTasks} />
          <TimeTable
            assignedTasks={assignedTasks}
            onDropTask={handleDrop}
            onDeleteTask={handleDelete}
          />
        </div>
      </div>
    </Modal>
  );
}
