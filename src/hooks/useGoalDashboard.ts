import { getDashboardGoals } from '@/api/dashboardGoalsApi';
import { useQuery } from '@tanstack/react-query';

export const useGoalsDashboard = (userId: number) => {
  return useQuery({
    queryKey: ['goals', 'dashboard', userId],
    queryFn: () => getDashboardGoals(userId),
    enabled: !!userId,
  });
};
