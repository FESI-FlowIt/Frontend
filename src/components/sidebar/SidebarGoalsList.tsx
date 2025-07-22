'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { GoalSummary } from '@/interfaces/dashboardgoalInterface';
import { ROUTES } from '@/lib/routes';

export default function SidebarGoalsList() {
  const [goals, setGoals] = useState<GoalSummary[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGoals = async () => {
      const res = await fetch('/goals');
      if (!res.ok) throw new Error('Failed to fetch goals');

      const data = await res.json();
      setGoals(data);
    };

    fetchGoals();
  }, []);

  const handlePinClick = async ({
    goalId,
    currentPinned,
  }: {
    goalId: string;
    currentPinned: boolean;
  }) => {
    const nextPinned = !currentPinned;

    try {
      const res = await fetch(`/goals/${goalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPinned: nextPinned }),
      });

      const data = await res.json();
      setGoals(prev =>
        prev.map(goal => (goal.goalId === goalId ? { ...goal, isPinned: data.isPinned } : goal)),
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col gap-12 sm:gap-8 md:gap-12">
      {goals.map(goal => (
        <div
          key={goal.goalId}
          className="flex h-52 w-260 items-center justify-between px-10 sm:h-40 sm:w-248 md:h-52 md:w-260"
        >
          <div
            onClick={() => router.push(ROUTES.GOALS.DETAIL(goal.goalId))}
            className="flex cursor-pointer items-center gap-20"
          >
            <div className={`h-12 w-12 rounded-full bg-goal-${goal.color}`} />
            <span className="text-text-02 text-body-m-20 md:text-body-sb-20 sm:text-body-b-16 w-170 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {goal.title}
            </span>
          </div>
          <button
            onClick={() => handlePinClick({ goalId: goal.goalId, currentPinned: goal.isPinned })}
            className="relative h-24 w-24 cursor-pointer sm:h-20 sm:w-20 md:h-24 md:w-24"
          >
            <Image
              src={goal.isPinned ? '/assets/icons/pinIcon_on.svg' : '/assets/icons/pinIcon_off.svg'}
              alt="핀 오프 아이콘"
              fill
            />
          </button>
        </div>
      ))}
    </div>
  );
}
