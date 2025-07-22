'use client';

import { useState } from 'react';
import { Goal, Todo } from '@/interfaces/dashboardgoalInterface';
import Modal from '@/components/ui/Modal';
import TimerIcon from '@/../public/assets/icons/timerIcon.svg';

type SelectTodoModalProps = {
  goals: Goal[];
  onClose: () => void;
  onSelect: (goal: Goal, todo: Todo) => void;
};

export default function SelectTodoModal({ goals, onClose, onSelect }: SelectTodoModalProps) {
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  return (
    <Modal isOpen onClose={onClose} size="timer">
      <div className="mb-6 flex items-center gap-12">
        <TimerIcon className="text-Gray_01 h-24 w-24" />
        <h2 className="text-heading-sb-20 text-lg font-bold">어떤 작업을 시작해볼까요?</h2>
      </div>

      {goals.map(goal => {
        const isSelected = selectedGoalId === goal.id;
        return (
          <div key={goal.id} className="h-[64px] w-[520px] rounded-md border bg-gray-50 px-4 py-3">
            <button
              className="relative flex h-full w-full items-center justify-between text-left font-medium"
              onClick={() => setSelectedGoalId(prev => (prev === goal.id ? null : goal.id))}
            >
              <span className="flex items-center gap-2 font-semibold">
                <span className={`h-12 w-12 rounded-full bg-goal-${goal.color}`} />
                {goal.title}
              </span>
              <span className="absolute top-[20px] left-[476px] text-gray-500">
                {isSelected ? '▲' : '▼'}
              </span>
            </button>

            {isSelected && (
              <div className="mt-3 space-y-2">
                {goal.todos.map(todo => (
                  <button
                    key={todo.id}
                    onClick={() => onSelect(goal, todo)}
                    className="w-full rounded-md border bg-white px-4 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    {todo.content}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </Modal>
  );
}
