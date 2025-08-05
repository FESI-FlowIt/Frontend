'use client';

import React, { useRef, useState } from 'react';

import clsx from 'clsx';

import ArrowDownFullIcon from '@/assets/icons/arrow-down-full.svg';
import GoalIcon from '@/assets/icons/goal.svg';
import { useGoals } from '@/hooks/useGoals';
import { getGoalBackgroundColorClass, getGoalTextColorClass } from '@/lib/goalColors';

import DropdownPortal from '../ui/DropdownMenu';

interface GoalSelectorProps {
  selectedGoalId: number;
  // eslint-disable-next-line no-unused-vars
  onSelectGoal: (goalId: number) => void;
  error?: boolean;
  variant?: 'default' | 'notes';
  className?: string;
}

const GoalSelector = ({
  selectedGoalId,
  onSelectGoal,
  error,
  variant = 'default',
  className,
}: GoalSelectorProps) => {
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
    <div className={clsx('relative w-full', className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'text-body-m-16 flex h-44 w-full items-center transition-colors focus:ring-2 focus:outline-none',
          {
            // Default variant
            'justify-between rounded-lg border px-20 py-10': variant === 'default',
            'border-error focus:ring-error': variant === 'default' && error,
            'border-line focus:ring-primary-01-hover focus:border-primary-01-hover':
              variant === 'default' && !error,

            // Notes variant
            'rounded-12 justify-start gap-8 bg-white px-16 py-12': variant === 'notes',
            'focus:ring-primary-01 focus:border-primary-01': variant === 'notes',
          },
        )}
      >
        <div className="flex items-center gap-8">
          {variant === 'notes' && (
            <div className="h-24 w-24">
              <GoalIcon
                className={clsx(
                  'h-full w-full',
                  selectedGoal ? getGoalTextColorClass(selectedGoal.color) : 'text-gray-500',
                )}
              />
            </div>
          )}
          {variant === 'default' && selectedGoal && (
            <div
              className={clsx(
                'h-12 w-12 flex-shrink-0 rounded-full',
                getGoalBackgroundColorClass(selectedGoal.color),
              )}
            />
          )}
          <span className="text-text-01 text-body-sb-20">
            {selectedGoal ? selectedGoal.title : '목표 선택'}
          </span>
        </div>

        {variant === 'default' && (
          <svg
            className={clsx('h-16 w-16 transform transition-transform', {
              'rotate-180': isOpen,
            })}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}

        {variant === 'notes' && (
          <ArrowDownFullIcon
            className={clsx('text-gray-01 ml-auto h-16 w-16 transform transition-transform', {
              'rotate-180': isOpen,
            })}
          />
        )}
      </button>

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
              className={clsx(
                'hover:bg-tertiary-01 flex w-full items-center space-x-12 px-20 py-12 text-left transition-colors',
                {
                  'bg-primary-01/10 text-primary-01': selectedGoalId === goal.goalId,
                  'text-text-01': selectedGoalId !== goal.goalId,
                },
              )}
            >
              <div
                className={clsx(
                  'h-12 w-12 flex-shrink-0 rounded-full',
                  getGoalBackgroundColorClass(goal.color),
                )}
              />
              <span className="truncate">{goal.title}</span>
              {selectedGoalId === goal.goalId && <span className="text-primary-01 ml-auto">✓</span>}
            </button>
          ))}
        </div>
      </DropdownPortal>
    </div>
  );
};

export default GoalSelector;
