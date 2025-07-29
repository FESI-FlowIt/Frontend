'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import GoIcon from '@/../public/assets/icons/go.svg';
import Card from '@/components/ui/Card';
import { useGoalsDashboard } from '@/hooks/useGoalDashboard';
import { ROUTES } from '@/lib/routes';
import { useUserStore } from '@/store/userStore';

import TodoModal from '../todos/TodoModal';

import GoalListDashboardCard from './GoalListDashboardCard';
import NoGoalsGuide from './NoGoalsGuide';

export default function GoalListDashboardSection() {
  const userId = useUserStore(state => state.user?.id ?? 0);
  const { data: goals = [], isLoading } = useGoalsDashboard(userId);
  const router = useRouter();

  const safeGoals = Array.isArray(goals) ? goals : [];

  const sortedGoals = [...safeGoals]
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 3);

  return (
    <>
      <Card
        icon={
          <Image
            src="/assets/icons/dashborad-goal.svg"
            alt="목표별할일 아이콘"
            width={24}
            height={24}
          />
        }
        title="목표 별 할 일"
        extra={
          <button
            onClick={() => router.push(ROUTES.GOALS.LIST)}
            className="text-text-03 flex items-center gap-8 hover:underline"
          >
            <span className="text-body-sb-20 hidden md:inline">모든 목표 보기</span>
            <span className="text-body-mb-16 inline md:hidden">모두 보기</span>
            <GoIcon width={20} height={20} />
          </button>
        }
        backgroundColor="gray"
        size="goal"
        flexWrapExtra={false}
      >
        {isLoading ? (
          <div className="text-text-03 text-body-m-16">로딩 중...</div>
        ) : sortedGoals.length === 0 ? (
          <NoGoalsGuide />
        ) : (
          <div className="flex flex-wrap justify-center gap-12">
            {sortedGoals.map(goal => (
              <GoalListDashboardCard key={goal.goalId} goal={goal} />
            ))}
          </div>
        )}
      </Card>
      <TodoModal />
    </>
  );
}
