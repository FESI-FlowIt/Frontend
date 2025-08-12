'use client';

import { useEffect, useState } from 'react';

import Modal from '@/components/ui/Modal';
import { GoalSummary } from '@/interfaces/goal';
import { TodoSummary } from '@/interfaces/todo';

import SelectTodoModalBody from './SelectTodoModalBody';
import SelectTodoModalHeader from './SelectTodoModalHeader';

interface SelectTodoModalProps {
  goals: GoalSummary[];
  onClose: () => void;
  onSelect: (goal: GoalSummary, todo: TodoSummary) => void;
  defaultSelectedGoalId?: string | null;
}

export default function SelectTodoModal({
  goals,
  onClose,
  onSelect,
  defaultSelectedGoalId = null,
}: SelectTodoModalProps) {
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedGoalId(defaultSelectedGoalId);
  }, [defaultSelectedGoalId]);

  const allTodosEmpty = goals.length === 0 || goals.every(goal => goal.todos.length === 0);

  return (
    <Modal isOpen onClose={onClose} size="timer" padding="none">
      <div className="flex h-full w-full flex-col px-16 pt-24 pb-16 md:px-10 md:pt-10 md:pb-10">
        <SelectTodoModalHeader onClose={onClose} />

        <SelectTodoModalBody
          goals={goals}
          allTodosEmpty={allTodosEmpty}
          selectedGoalId={selectedGoalId}
          setSelectedGoalId={setSelectedGoalId}
          onSelect={onSelect}
        />
      </div>
    </Modal>
  );
}
