import { goalMapper } from '@/api/mapper/goalMapper';
import { GoalSummary } from '@/interfaces/goal';

import { getRequest } from '.';

export const getDashboardGoals = async (): Promise<GoalSummary[]> => {
  const response = await getRequest('/goals/dashboard/summaries');
  const apiGoals = response.result || response || [];

  return goalMapper.mapApiToGoalSummaries(apiGoals);
};
