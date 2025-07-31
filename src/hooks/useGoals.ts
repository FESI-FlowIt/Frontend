import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { goalsApi } from '@/api/goalsApi';
import { goalMapper } from '@/api/mapper/goalMapper';
import { GetGoalsRequestParams, GoalFormData } from '@/interfaces/goal';
import { useUserStore } from '@/store/userStore';

import { CALENDAR_QUERY_KEY } from './useGoalCalendar';
import { GOALS_SIDEBAR_QUERY_KEY } from './useSidebar';

export const GOALS_QUERY_KEY = ['goals'];

//목표 목록 조회
export const useGoals = (params?: GetGoalsRequestParams) => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: [...GOALS_QUERY_KEY, user?.id, params],
    queryFn: async () => {
      //TODO: api함수로 매핑
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const apiResponse = await goalsApi.getGoals(user.id, params);

      return goalMapper.mapToGoalList(apiResponse);
    },
    enabled: !!user?.id,
  });
};

//목표 상세 조회
export const useGoal = (goalId: number) => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: [...GOALS_QUERY_KEY, user?.id, goalId],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const apiResponse = await goalsApi.getGoal(user.id, goalId);
      return goalMapper.mapToGoal(apiResponse);
    },
    enabled: !!goalId && !!user?.id,
  });
};

// 목표 생성
export const useCreateGoal = () => {
  const queryClient = useQueryClient();
  const user = useUserStore(state => state.user);

  return useMutation({
    mutationFn: async (goalData: GoalFormData) => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      // 토큰 및 사용자 정보 확인용 로그
      const apiResponse = await goalsApi.createGoal(user.id, goalData);
      return goalMapper.mapToGoal(apiResponse);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [GOALS_SIDEBAR_QUERY_KEY, user?.id] });
      queryClient.invalidateQueries({ queryKey: [CALENDAR_QUERY_KEY, user?.id] });
    },
    onError: error => {
      console.error('❌ Goal creation failed:', error);
    },
  });
};

// 목표 수정
export const useUpdateGoal = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  return useMutation({
    mutationFn: async ({ goalId, data }: { goalId: number; data: Partial<GoalFormData> }) => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const apiResponse = await goalsApi.updateGoal(goalId, user.id, data);
      return goalMapper.mapToGoal(apiResponse);
    },
    onSuccess: (updatedGoal, { goalId }) => {
      // 전체 목표 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
      // 개별 목표 캐시 무효화
      queryClient.invalidateQueries({ queryKey: [...GOALS_QUERY_KEY, goalId] });
      // 사이드바 목표 목록 무효화
      queryClient.invalidateQueries({ queryKey: [GOALS_SIDEBAR_QUERY_KEY, user?.id] });
      // 캘린더 데이터 무효화
      queryClient.invalidateQueries({ queryKey: [CALENDAR_QUERY_KEY, user?.id] });
      // 강제로 모든 관련 쿼리 리패치
      queryClient.refetchQueries({ queryKey: [...GOALS_QUERY_KEY, goalId] });
    },
  });
};

// 목표 고정 상태 변경
export const useUpdateGoalPinStatus = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  return useMutation({
    mutationFn: async ({ goalId, isPinned }: { goalId: number; isPinned: boolean }) => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const apiResponse = await goalsApi.updateGoalPinStatus(goalId, user.id, isPinned);
      return goalMapper.mapToGoal(apiResponse);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [GOALS_SIDEBAR_QUERY_KEY, user?.id] });
    },
  });
};

// 목표 삭제
export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  return useMutation({
    mutationFn: (goalId: number) => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      return goalsApi.deleteGoal(goalId, user.id);
    },
    onSuccess: (result, goalId) => {
      // 전체 목표 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
      // 개별 목표 캐시 무효화
      queryClient.invalidateQueries({ queryKey: [...GOALS_QUERY_KEY, goalId] });
      // 사이드바 목표 목록 무효화
      queryClient.invalidateQueries({ queryKey: [GOALS_SIDEBAR_QUERY_KEY, user?.id] });
      // 캘린더 데이터 무효화
      queryClient.invalidateQueries({ queryKey: [CALENDAR_QUERY_KEY, user?.id] });
    },
  });
};
