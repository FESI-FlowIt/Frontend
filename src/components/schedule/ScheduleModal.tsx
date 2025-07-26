'use client';

import { useState } from 'react';

import Modal from '@/components/ui/Modal';
import { goalSummariesRes } from '@/mocks/mockResponses/goals/goalsResponse';

import ScheduleFooter from './ScheduleFooter';
import ScheduleHeader from './ScheduleHeader';
import TimeTable from './TimeTable';
import UnassignedTaskList from './UnassignedTaskList';

export interface Task {
  id: string;
  title: string;
  color: string;
}

export interface AssignedTask {
  task: Task;
  time: string;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const extractTasksFromGoals = (): Task[] => {
  return goalSummariesRes.goals.flatMap(goal =>
    goal.todos
      .filter(todo => !todo.isDone)
      .map(todo => ({
        id: todo.id,
        title: todo.title,
        color: goal.color,
      })),
  );
};

export default function ScheduleModal({ isOpen, onClose }: ScheduleModalProps) {
  const [originalTasks] = useState<Task[]>(() => extractTasksFromGoals());
  const [unassignedTasks, setUnassignedTasks] = useState<Task[]>(() => extractTasksFromGoals());
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

    setUnassignedTasks(prev => {
      const newTasks = [...prev];
      const originalIndex = originalTasks.findIndex(t => t.id === task.id);

      if (!newTasks.find(t => t.id === task.id) && originalIndex !== -1) {
        newTasks.splice(originalIndex, 0, task);
      }

      return newTasks;
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="schedule" padding="none" rounded="schedule">
      <div className="flex h-full w-full flex-col">
        <ScheduleHeader onClose={onClose} />
        <div className="flex h-full w-full flex-col md:flex-row">
          <UnassignedTaskList tasks={unassignedTasks} />
          <TimeTable
            assignedTasks={assignedTasks}
            onDropTask={handleDrop}
            onDeleteTask={handleDelete}
          />
        </div>
        <ScheduleFooter onCancel={onClose} onSave={() => {}} />
      </div>
    </Modal>
  );
}
