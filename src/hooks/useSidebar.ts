import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getGoalsSidebar, patchGoalSidebarisPinned } from '@/api/sidebarApi';

export const useDashboardGoals = (userId: string) => {
  return useQuery({
    queryKey: ['goals-dashboard'],
    queryFn: () => getGoalsSidebar(userId),
  });
};

export const useDashboardGoalPinned = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isPinned, goalId }: { goalId: string; isPinned: boolean }) =>
      patchGoalSidebarisPinned(goalId, isPinned),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals-dashboard'] });
    },
  });
};
