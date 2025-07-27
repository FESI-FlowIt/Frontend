import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getGoalsSidebar, patchGoalSidebarisPinned } from '@/api/sidebarApi';

export const useSidebarGoals = (userId: string) => {
  return useQuery({
    queryKey: ['goals-sidebar'],
    queryFn: () => getGoalsSidebar(userId),
  });
};

export const useSidebarGoalPinned = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isPinned, goalId }: { goalId: string; isPinned: boolean }) =>
      patchGoalSidebarisPinned(goalId, isPinned),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals-sidebar'] });
    },
  });
};
