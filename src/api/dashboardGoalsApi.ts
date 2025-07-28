import { GoalSummary } from '@/interfaces/goal';

import { getRequest } from '.';

export const getDashboardGoals = async (userId: number): Promise<GoalSummary[]> => {
  const data = await getRequest('/goals/dashboard', { userId });
  return data;
};
