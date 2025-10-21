'use client';

import { useSidebar } from '@/app/providers/SidebarProvider';
import { GoalSummary } from '@/interfaces/goal';

import NoGoalsGuide from '../NoGoalsGuide';

import GoalCard from './GoalCard';

interface GoalsListProps {
  goals: GoalSummary[];
}

const GoalsList = ({ goals }: GoalsListProps) => {
  const { isOpen } = useSidebar();

  return (
    <>
      {goals.length > 0 ? (
        <div
          className={`grid sm:grid-cols-1 sm:gap-16 md:grid-cols-2 md:gap-12 lg:gap-24 xl:grid-cols-3 ${isOpen ? 'lg:w-866 lg:grid-cols-2 xl:w-full' : 'lg:grid-cols-3'}`}
        >
          {goals.map(goal => (
            <GoalCard key={goal.goalId} goal={goal} />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <NoGoalsGuide />
        </div>
      )}
    </>
  );
};

export default GoalsList;
