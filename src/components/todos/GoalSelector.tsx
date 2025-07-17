'use client';

import React, { useRef, useState } from 'react';

import { useGoals } from '@/hooks/useGoals';

import DropdownPortal from '../ui/DropdownMenu';

interface GoalSelectorProps {
  selectedGoalId: string;
  onSelectGoal: (goalId: string) => void;
  error?: boolean;
}

const GoalSelector = ({ selectedGoalId, onSelectGoal, error }: GoalSelectorProps) => {
  const { data: goalsData, isLoading } = useGoals({ limit: 100 });
  const [isOpen, setIsOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedGoal = goalsData?.goals.find(goal => goal.goalId === selectedGoalId);

  if (isLoading) {
    return (
      <div className="text-body-m-16 border-line bg-tertiary-01 flex h-44 w-full items-center rounded-lg border px-20 py-10">
        <span className="text-text-04">목표를 불러오는 중...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`text-body-m-16 flex h-44 w-full items-center justify-between rounded-lg border px-20 py-10 transition-colors focus:ring-2 focus:outline-none ${
          error
            ? 'border-error focus:ring-error'
            : 'border-line focus:ring-primary-01-hover focus:border-primary-01-hover'
        }`}
      >
        <span className={selectedGoal ? 'text-text-01' : 'text-text-04'}>
          {selectedGoal ? selectedGoal.title : '목표 선택'}
        </span>
      </button>

      {/* {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="border-line absolute top-full right-0 left-0 z-50 mt-4 max-h-200 overflow-y-auto rounded-lg border bg-white shadow-lg">
            {goalsData?.goals.map(goal => (
              <button
                key={goal.goalId}
                type="button"
                onClick={() => {
                  onSelectGoal(goal.goalId);
                  setIsOpen(false);
                }}
                className="hover:bg-tertiary-01 flex w-full items-center space-x-12 px-20 py-12 text-left transition-colors"
              >
                <div
                  className="h-12 w-12 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: `var(${goal.color})` }}
                />
                <span className="text-text-01 truncate">{goal.title}</span>
              </button>
            ))}
          </div>
        </>
      )} */}
      <DropdownPortal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        position="bottom-left"
        size="full"
        animation="slide"
        shadow="md"
        className="max-h-200 w-full overflow-y-auto"
      >
        <div className="py-4">
          {goalsData?.goals.map(goal => (
            <button
              key={goal.goalId}
              type="button"
              onClick={() => {
                onSelectGoal(goal.goalId);
                setIsOpen(false);
              }}
              className={`hover:bg-tertiary-01 flex w-full items-center space-x-12 px-20 py-12 text-left transition-colors ${
                selectedGoalId === goal.goalId ? 'bg-primary-01/10 text-primary-01' : 'text-text-01'
              }`}
            >
              <div
                className="h-12 w-12 flex-shrink-0 rounded-full"
                style={{ backgroundColor: `var(${goal.color})` }}
              />
              <span className="truncate">{goal.title}</span>
              {/* 🔥 선택된 목표 표시 */}
              {selectedGoalId === goal.goalId && <span className="text-primary-01 ml-auto">✓</span>}
            </button>
          ))}
        </div>
      </DropdownPortal>
    </div>
  );
};

export default GoalSelector;
