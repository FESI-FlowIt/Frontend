'use client';

import GoalListDashboardCard from '@/components/goals/goallist/GoalListDashboardCard';
import { mockGoalSummaries } from '@/mocks/data/mockGoalSummaries';

export default function Page() {
  return <GoalListDashboardCard goal={mockGoalSummaries[0]} />;
}
