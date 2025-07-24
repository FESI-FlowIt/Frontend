'use client';

import GoalListDashboardCard from './GoalListDashboardCard';
import { GoalSummary } from '@/interfaces/dashboardgoalInterface';
import Card from '@/components/ui/Card';
import NoGoalsGuide from './NoGoalsGuide';
import DashboardGoalIcon from '@/../public/assets/icons/dashborad-goal.svg';
import GoIcon from '@/../public/assets/icons/go.svg';

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

  const cardTitle = <span className="text-body-sb-20 text-text-01">목표 별 할 일</span>;

  const cardExtra = (
    <button className="text-body-sb-20 text-text-03 flex items-center gap-8 hover:underline">
      모든 목표 보기
      <GoIcon width={20} height={20} />
    </button>
  );

  return (
    <Card
      icon={<DashboardGoalIcon width={24} height={24} />}
      title={cardTitle}
      extra={cardExtra}
      backgroundColor="cardContainer"
      size="goal"
    >
      {sortedGoals.length === 0 ? (
        <NoGoalsGuide />
      ) : (
        <div className="flex flex-wrap gap-12">
          {sortedGoals.map(goal => (
            <GoalListDashboardCard key={goal.goalId} goal={goal} />
          ))}
        </div>
      )}
    </Card>
  );
}
