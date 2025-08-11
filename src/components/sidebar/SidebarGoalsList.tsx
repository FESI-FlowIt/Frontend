'use client';

import { useRouter } from 'next/navigation';

import PinOffIcon from '@/assets/icons/pin-off.svg';
import PinOnIcon from '@/assets/icons/pin-on.svg';
import { useSidebarGoalPinned, useSidebarGoals } from '@/hooks/useSidebar';
import { getGoalBackgroundColorClass } from '@/lib/goalColors';
import { ROUTES } from '@/lib/routes';

import CustomLoading from '../ui/CustomLoading';

export default function SidebarGoalsList() {
  const { data: goals, isLoading } = useSidebarGoals();
  const updatePinStatus = useSidebarGoalPinned();
  const router = useRouter();

  const handlePinClick = ({
    goalId,
    currentPinned,
  }: {
    goalId: number;
    currentPinned: boolean;
  }) => {
    const nextPinned = !currentPinned;
    updatePinStatus.mutate({ goalId, isPinned: nextPinned });
  };

  if (isLoading) return <CustomLoading />;

  return (
    <div className="flex flex-col gap-12 sm:gap-8 md:gap-12">
      {goals?.map(goal => {
        return (
          <div
            key={goal.goalId}
            className="flex h-52 w-260 items-center justify-between px-10 sm:h-40 sm:w-248 md:h-52 md:w-260"
          >
            <div
              onClick={() => router.push(ROUTES.GOALS.DETAIL(`${goal.goalId}`))}
              className="flex cursor-pointer items-center gap-20"
            >
              <div
                className={`h-12 w-12 rounded-full ${getGoalBackgroundColorClass(goal.color)}`}
              />
              <span className="text-text-02 text-body-m-20 md:text-body-sb-20 sm:text-body-b-16 w-170 overflow-hidden overflow-ellipsis whitespace-nowrap transition-transform duration-300 ease-in-out hover:scale-110 hover:text-black">
                {goal.name}
              </span>
            </div>
            <button
              onClick={() => handlePinClick({ goalId: goal.goalId, currentPinned: goal.isPinned })}
              className="relative h-24 w-24 cursor-pointer sm:h-20 sm:w-20 md:h-24 md:w-24"
            >
              {goal.isPinned ? (
                <PinOnIcon
                  className="text-heatmap-accent"
                  width={24}
                  height={24}
                  fill="currentColor"
                />
              ) : (
                <PinOffIcon className="text-inactive" width={24} height={24} fill="currentColor" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
