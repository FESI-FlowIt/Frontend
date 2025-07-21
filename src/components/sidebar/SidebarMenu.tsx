'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { GoalSummary } from '@/interfaces/dashboardgoalInterface';
import { ROUTES } from '@/lib/routes';

export default function SidebarMenu() {
  const [goals, setGoals] = useState<GoalSummary[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGoals = async () => {
      const res = await fetch('/api/goals');
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
      const res = await fetch(`/api/goals/${goalId}`, {
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
    <div className="flex flex-col">
      <div
        onClick={() => router.push(ROUTES.DASHBOARD)}
        className="border-line mb-16 flex h-84 w-260 items-center gap-12 border-y-2 px-10 py-16"
      >
        <button className="relative h-24 w-24 cursor-pointer">
          <Image src="/assets/icons/homeIcon.svg" alt="대쉬보드 아이콘" fill />
        </button>
        <span className="text-text-01 text-body-sb-20">대시보드</span>
      </div>

      <div className="flex w-260 flex-col gap-16">
        <div className="flex h-52 w-260 items-center gap-12 px-10">
          <div className="relative h-24 w-24">
            <Image src="/assets/icons/goalIcon.svg" alt="목표 아이콘" fill />
          </div>
          <span className="text-text-01 text-body-sb-20">목표</span>
        </div>

        <div className="flex flex-col gap-12">
          {goals.map(goal => (
            <div key={goal.goalId} className="flex h-52 w-260 items-center justify-between px-10">
              <div
                onClick={() => router.push(ROUTES.GOALS.DETAIL(goal.goalId))}
                className="flex items-center gap-20"
              >
                <div className="bg-error h-12 w-12 rounded-full" />
                <span className="text-text-02 text-body-m-20">{goal.title}</span>
              </div>
              <button
                onClick={() =>
                  handlePinClick({ goalId: goal.goalId, currentPinned: goal.isPinned })
                }
                className="relative h-24 w-24 cursor-pointer"
              >
                <Image
                  src={
                    goal.isPinned ? '/assets/icons/pinIcon_on.svg' : '/assets/icons/pinIcon_off.svg'
                  }
                  alt="핀 오프 아이콘"
                  fill
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
