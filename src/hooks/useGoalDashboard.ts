import { useQuery } from '@tanstack/react-query';

import { getDashboardGoals } from '@/api/dashboardGoalsApi';

export const useGoalsDashboard = () => {
  return useQuery({
    queryKey: ['goals', 'dashboard'],
    queryFn: () => getDashboardGoals(),
  });
};
