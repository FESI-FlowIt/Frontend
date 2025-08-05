import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { goalsApi } from '@/api/goalsApi';
import { goalMapper } from '@/api/mapper/goalMapper';
import { GetGoalsRequestParams, GoalFormData } from '@/interfaces/goal';

import { CALENDAR_QUERY_KEY } from './useGoalCalendar';
import { GOALS_SIDEBAR_QUERY_KEY } from './useSidebar';

export const GOALS_QUERY_KEY = ['goals'];

//목표 목록 조회
export const useGoals = (params?: GetGoalsRequestParams) => {
  return useQuery({
    queryKey: [...GOALS_QUERY_KEY, params],
    queryFn: async () => {
      //TODO: api함수로 매핑

      const apiResponse = await goalsApi.getGoals(params);

      return goalMapper.mapApiToGoalList(apiResponse);
    },
  });
};

//목표 상세 조회
export const useGoal = (goalId: number) => {
  return useQuery({
    queryKey: [...GOALS_QUERY_KEY, goalId],
    queryFn: async () => {
      const apiResponse = await goalsApi.getGoal(goalId);
      return goalMapper.mapApiToGoal(apiResponse);
    },
    enabled: !!goalId,
  });
};

// 목표 생성
export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goalData: GoalFormData) => {
      const apiResponse = await goalsApi.createGoal(goalData);
      return goalMapper.mapApiToGoal(apiResponse);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [GOALS_SIDEBAR_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [CALENDAR_QUERY_KEY] });
    },
    onError: error => {
      console.error('❌ Goal creation failed:', error);
    },
  });
};

// 목표 수정
export const useUpdateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ goalId, data }: { goalId: number; data: Partial<GoalFormData> }) => {
      const apiResponse = await goalsApi.updateGoal(goalId, data);
      return goalMapper.mapApiToGoal(apiResponse);
    },
    onSuccess: (updatedGoal, { goalId }) => {
      // 전체 목표 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
      // 개별 목표 캐시 무효화
      queryClient.invalidateQueries({ queryKey: [...GOALS_QUERY_KEY, goalId] });
      // 사이드바 목표 목록 무효화
      queryClient.invalidateQueries({ queryKey: [GOALS_SIDEBAR_QUERY_KEY] });
      // 캘린더 데이터 무효화
      queryClient.invalidateQueries({ queryKey: [CALENDAR_QUERY_KEY] });
      // 강제로 모든 관련 쿼리 리패치
      queryClient.refetchQueries({ queryKey: [...GOALS_QUERY_KEY, goalId] });
    },
  });
};

// 목표 고정 상태 변경
export const useUpdateGoalPinStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ goalId, isPinned }: { goalId: number; isPinned: boolean }) => {
      const apiResponse = await goalsApi.updateGoalPinStatus(goalId, isPinned);
      return goalMapper.mapApiToGoal(apiResponse);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [GOALS_SIDEBAR_QUERY_KEY] });
    },
  });
};

// 목표 삭제
export const useDeleteGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goalId: number) => {
      return goalsApi.deleteGoal(goalId);
    },
    onSuccess: (result, goalId) => {
      // 전체 목표 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
      // 개별 목표 캐시 무효화
      queryClient.invalidateQueries({ queryKey: [...GOALS_QUERY_KEY, goalId] });
      // 사이드바 목표 목록 무효화
      queryClient.invalidateQueries({ queryKey: [GOALS_SIDEBAR_QUERY_KEY] });
      // 캘린더 데이터 무효화
      queryClient.invalidateQueries({ queryKey: [CALENDAR_QUERY_KEY] });
    },
  });
};
