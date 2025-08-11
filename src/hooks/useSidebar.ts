import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { goalMapper } from '@/api/mapper/goalMapper';
import { getGoalsSidebar, patchGoalSidebarisPinned } from '@/api/sidebarApi';

import { GOALS_QUERY_KEY } from './useGoals';

export const GOALS_SIDEBAR_QUERY_KEY = ['goals-sidebar'];

export const useSidebarGoals = () => {
  return useQuery({
    queryKey: [GOALS_SIDEBAR_QUERY_KEY],
    queryFn: () => getGoalsSidebar(),
    select: goalMapper.mapApiToSidebarGoals,
  });
};

export const useSidebarGoalPinned = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isPinned, goalId }: { goalId: number; isPinned: boolean }) =>
      patchGoalSidebarisPinned(goalId, isPinned),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GOALS_SIDEBAR_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
    },
  });
};
