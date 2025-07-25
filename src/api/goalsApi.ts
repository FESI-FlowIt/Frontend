import {
  CreateGoalRequest,
  GetGoalsRequestParams,
  GetGoalsResponse,
  Goal,
  GoalFormData,
  UpdateGoalRequest,
} from '@/interfaces/goal';

import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '.';

export const goalsApi = {
  // 목표 목록 조회
  getGoals: async (params?: GetGoalsRequestParams): Promise<GetGoalsResponse> => {
    const requestParams = {
      page: params?.page ?? 1,
      limit: params?.limit ?? 6,
      sortBy: params?.sortBy ?? 'latest',
      ...(params?.isPinned !== undefined && { isPinned: params.isPinned.toString() }),
    };

    return getRequest('/goals', requestParams);
  },

  // 목표 상세 조회
  getGoal: async (goalId: string): Promise<Goal> => {
    return getRequest(`/goals/${goalId}`);
  },

  // 목표 생성
  createGoal: async (goalData: GoalFormData): Promise<Goal> => {
    const requestData: CreateGoalRequest = {
      title: goalData.title,
      color: goalData.color,
      dueDate: goalData.dueDate.toISOString(),
    };

    return postRequest('/goals', requestData);
  },

  // 목표 수정
  updateGoal: async (goalId: string, goalData: Partial<GoalFormData>): Promise<Goal> => {
    const requestData: Omit<UpdateGoalRequest, 'goalId'> = {
      ...(goalData.title && { title: goalData.title }),
      ...(goalData.color && { color: goalData.color }),
      ...(goalData.dueDate && { dueDate: goalData.dueDate.toISOString() }),
    };

    return putRequest(`/goals/${goalId}`, requestData);
  },

  // 목표 고정 상태 변경
  updateGoalPinStatus: async (goalId: string, isPinned: boolean): Promise<Goal> => {
    return patchRequest(`/goals/${goalId}`, { isPinned });
  },

  // 목표 삭제
  deleteGoal: async (goalId: string): Promise<void> => {
    return deleteRequest(`/goals/${goalId}`);
  },
};
