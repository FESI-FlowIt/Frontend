'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useGoals, useUpdateGoalPinStatus } from '@/hooks/useGoals';
import { ROUTES } from '@/lib/routes';

export default function SidebarGoalsList() {
  const { data } = useGoals();
  const updatePinStatus = useUpdateGoalPinStatus();
  const router = useRouter();

  const handlePinClick = async ({
    goalId,
    currentPinned,
  }: {
    goalId: string;
    currentPinned: boolean;
  }) => {
    const nextPinned = !currentPinned;
    updatePinStatus.mutate({ goalId, isPinned: nextPinned });
  };

  return (
    <div className="flex flex-col gap-12 sm:gap-8 md:gap-12">
      {data?.goals?.map(goal => (
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
