import { useQuery } from '@tanstack/react-query';
import { getDashboardGoals } from '@/api/dashboardGoalsApi';

export const useGoalsDashboard = (userId: number) => {
  return useQuery({
    queryKey: ['goals', 'dashboard', userId],
    queryFn: () => getDashboardGoals(userId),
    enabled: !!userId,
  });
};
