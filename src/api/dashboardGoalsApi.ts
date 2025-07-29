import { GoalSummary } from '@/interfaces/goal';
import { mapApiResponseToGoalSummary } from '@/lib/goalListDashboardMapper';

import { getRequest } from '.';

export const getDashboardGoals = async (userId: number): Promise<GoalSummary[]> => {
  const response = await getRequest('/goals/dashboard/summaries', { userId });
  const apiGoals = response.result || response || [];

  return mapApiResponseToGoalSummary(apiGoals);
};
