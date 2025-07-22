'use client';

import { useEffect, useState } from 'react';

import TimerIcon from '@/../public/assets/icons/timerIcon.svg';
import { IconButton } from '@/components/ui/IconButton';
import Modal from '@/components/ui/Modal';
import { GoalSummary, Todo } from '@/interfaces/dashboardgoalInterface';

type SelectTodoModalProps = {
  goals: GoalSummary[];
  onClose: () => void;
  onSelect: (goal: GoalSummary, todo: Todo) => void;
  defaultSelectedGoalId?: string | null;
};

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

  return (
    <Modal isOpen onClose={onClose} size="timer">
      <div className="mb-40 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <TimerIcon className="text-Gray_01 h-24 w-24" />
          <h2 className="text-display-24 text-text-01">어떤 작업을 시작해볼까요?</h2>
        </div>
        <IconButton variant="close" aria-label="닫기" onClick={onClose} />
      </div>

      <div className="max-h-[60vh] space-y-12 overflow-x-hidden overflow-y-auto pr-16">
        {goals.map(goal => {
          const isSelected = selectedGoalId === goal.goalId;

          return (
            <div
              key={goal.goalId}
              className="border-line w-full max-w-520 rounded-xl border bg-white px-20 py-20"
            >
              <button
                className="flex w-full cursor-pointer items-center justify-between text-left"
                onClick={() =>
                  setSelectedGoalId(prev => (prev === goal.goalId ? null : goal.goalId))
                }
              >
                <span className="text-body-m-20 text-text-02 flex items-center gap-12">
                  <span className={`h-12 w-12 rounded-full bg-goal-${goal.color}`} />
                  {goal.title}
                </span>
                <span className="text-gray-500">{isSelected ? '▲' : '▼'}</span>
              </button>

              {isSelected && (
                <div className="bg-line mt-16 flex flex-col gap-12 rounded-lg p-12">
                  {goal.todos.map(todo => (
                    <button
                      key={todo.id}
                      onClick={() => {
                        onSelect(goal, todo);
                        setSelectedGoalId(null);
                      }}
                      className="text-body-long-16 w-full cursor-pointer rounded-md bg-white px-16 py-12 text-left"
                    >
                      {todo.content}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
