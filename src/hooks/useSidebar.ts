import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getGoalsSidebar, patchGoalSidebarisPinned } from '@/api/sidebarApi';

export const useSidebarGoals = (userId: string) => {
  return useQuery({
    queryKey: ['goals-sidebar', userId],
    queryFn: () => getGoalsSidebar(userId),
  });
};

export const useSidebarGoalPinned = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isPinned, goalId }: { goalId: string; isPinned: boolean }) =>
      patchGoalSidebarisPinned(goalId, isPinned),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals-sidebar', userId] });
    },
  });
};
