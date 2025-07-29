import {
  ApiGetGoalsResponse,
  ApiGoalSummary,
  CreateGoalRequest,
  GetGoalsRequestParams,
  GoalFormData,
} from '@/interfaces/goal';

import { deleteRequest, getRequest, patchRequest, postRequest } from '.';

export const goalsApi = {
  getGoals: async (
    userId: number,
    params?: GetGoalsRequestParams,
  ): Promise<ApiGetGoalsResponse> => {
    const requestParams = {
      userId: userId,
      isPinned: params?.isPinned?.toString() ?? 'false',
      sortedBy: params?.sortBy === 'latest' ? 'LATEST' : 'DUE_DATE',
      page: (params?.page ?? 1) - 1, // 0-based indexing
      size: params?.limit ?? 6,
    };

    return getRequest('/goals/summaries', requestParams);
  },

  // 목표 상세 조회
  getGoal: async (userId: number, goalId: number): Promise<ApiGoalSummary> => {
    const res = await getRequest(`/goals/${goalId}/summary`, { userId });
    return res.result;
  },

  // 목표 생성
  createGoal: async (userId: number, goalData: GoalFormData): Promise<ApiGoalSummary> => {
    const requestData: CreateGoalRequest = {
      userId: userId,
      name: goalData.title,
      color: goalData.color,
      dueDateTime:
        typeof goalData.deadlineDate === 'string'
          ? goalData.deadlineDate
          : goalData.deadlineDate.toISOString(),
    };
    return postRequest('/goals', requestData);
  },

  // 목표 수정
  updateGoal: async (
    goalId: number,
    userId: number,
    goalData: Partial<GoalFormData>,
  ): Promise<ApiGoalSummary> => {
    const requestData: {
      userId: number;
      name?: string;
      color?: string;
      dueDateTime?: string;
    } = {
      userId: userId,
    };

    if (goalData.title) {
      requestData.name = goalData.title;
    }
    if (goalData.color) {
      requestData.color = goalData.color;
    }
    if (goalData.deadlineDate) {
      requestData.dueDateTime =
        typeof goalData.deadlineDate === 'string'
          ? goalData.deadlineDate
          : goalData.deadlineDate.toISOString();
    }

    return patchRequest(`/goals/${goalId}`, requestData);
  },

  // 목표 고정 상태 변경
  updateGoalPinStatus: async (
    goalId: number,
    userId: number,
    isPinned: boolean,
  ): Promise<ApiGoalSummary> => {
    const requestData = {
      userId: userId,
      isPinned: isPinned,
    };

    return patchRequest(`/goals/${goalId}/pin`, requestData);
  },

  // 목표 삭제
  deleteGoal: async (goalId: number, userId: number): Promise<void> => {
    return deleteRequest(`/goals/${goalId}?userId=${userId}`);
  },
};
