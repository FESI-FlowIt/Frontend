import { getRequest } from '.';
import { GoalSummary } from '@/interfaces/goal';

export const getDashboardGoals = async (userId: number): Promise<GoalSummary[]> => {
  const data = await getRequest('/goals/dashboard', { userId });
  return data;
};
