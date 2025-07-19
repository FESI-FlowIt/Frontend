'use client';

import GoalListDashboardCard from '@/components/goals/GoalListDashboardCard';
import { goalSummariesRes } from '@/mocks/mockResponses/goals/goalsResponse';

export default function Page() {
  return <GoalListDashboardCard goal={goalSummariesRes[0]} />;
}
