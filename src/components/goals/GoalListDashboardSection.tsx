'use client';

import DashboardGoalIcon from '@/../public/assets/icons/dashborad-goal.svg';
import GoIcon from '@/../public/assets/icons/go.svg';
import Card from '@/components/ui/Card';
import { GoalSummary } from '@/interfaces/dashboardgoalInterface';

import GoalListDashboardCard from './GoalListDashboardCard';
import NoGoalsGuide from './NoGoalsGuide';

interface Props {
  goals: GoalSummary[];
}

export default function GoalListDashboardSection({ goals }: Props) {
  const sortedGoals = [...goals]
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 3);

  return (
    <Card backgroundColor="cardContainer" size="goal">
      <div className="mb-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <DashboardGoalIcon width={24} height={24} />
          <span className="text-body-sb-20 text-text-01">목표 별 할 일</span>
        </div>
        <button className="text-text-03 flex items-center gap-8 hover:underline">
          <span className="text-body-sb-20 hidden md:inline">모든 목표 보기</span>
          <span className="text-body-mb-16 inline md:hidden">모두 보기</span>
          <GoIcon width={20} height={20} />
        </button>
      </div>

      {sortedGoals.length === 0 ? (
        <NoGoalsGuide />
      ) : (
        <div className="flex flex-wrap justify-center gap-12">
          {sortedGoals.map(goal => (
            <GoalListDashboardCard key={goal.goalId} goal={goal} />
          ))}
        </div>
      )}
    </Card>
  );
}
