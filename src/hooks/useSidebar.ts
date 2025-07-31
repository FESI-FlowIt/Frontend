import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { mapToSidebarGoals } from '@/api/mapper/sidebarMapper';
import { getGoalsSidebar, patchGoalSidebarisPinned } from '@/api/sidebarApi';

import { GOALS_QUERY_KEY } from './useGoals';

export const GOALS_SIDEBAR_QUERY_KEY = ['goals-sidebar'];

export const useSidebarGoals = (userId: number) => {
  return useQuery({
    queryKey: [GOALS_SIDEBAR_QUERY_KEY, userId],
    queryFn: () => getGoalsSidebar(userId),
    select: mapToSidebarGoals,
  });
};

export const useSidebarGoalPinned = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isPinned, goalId }: { goalId: number; isPinned: boolean }) =>
      patchGoalSidebarisPinned(goalId, isPinned, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GOALS_SIDEBAR_QUERY_KEY, userId] });
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
    },
  });
};
