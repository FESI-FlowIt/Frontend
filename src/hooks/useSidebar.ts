import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getGoalsSidebar, patchGoalSidebarisPinned } from '@/api/sidebarApi';

export const useSidebarGoals = (userId: number) => {
  return useQuery({
    queryKey: ['goals-sidebar', userId],
    queryFn: () => getGoalsSidebar(userId),
  });
};

export const useSidebarGoalPinned = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isPinned, goalId }: { goalId: number; isPinned: boolean }) =>
      patchGoalSidebarisPinned(goalId, isPinned),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals-sidebar', userId] });
    },
  });
};
