import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { goalsApi } from '@/api/goalsApi';
import { GetGoalsRequestParams, GoalFormData } from '@/interfaces/goal';

export const GOALS_QUERY_KEY = ['goals'];

//목표 목록 조회
export const useGoals = (params?: GetGoalsRequestParams) => {
  return useQuery({
    queryKey: [...GOALS_QUERY_KEY, params],
    queryFn: () => goalsApi.getGoals(params),
  });
};

//목표 상세 조회
export const useGoal = (goalId: string) => {
  return useQuery({
    queryKey: [...GOALS_QUERY_KEY, goalId],
    queryFn: () => goalsApi.getGoal(goalId),
    enabled: !!goalId,
  });
};

// 목표 생성
export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: goalsApi.createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
    },
  });
};

// 목표 수정
export const useUpdateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goalId, data }: { goalId: string; data: Partial<GoalFormData> }) =>
      goalsApi.updateGoal(goalId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
    },
  });
};

// 목표 고정 상태 변경
export const useUpdateGoalPinStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goalId, isPinned }: { goalId: string; isPinned: boolean }) =>
      goalsApi.updateGoalPinStatus(goalId, isPinned),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
    },
  });
};

// 목표 삭제
export const useDeleteGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goalId: string) => goalsApi.deleteGoal(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
    },
  });
};
