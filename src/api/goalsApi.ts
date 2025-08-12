import {
  ApiGetGoalsResponse,
  ApiGoalSummary,
  CreateGoalRequest,
  GetGoalsRequestParams,
  GoalFormData,
} from '@/interfaces/goal';

import { deleteRequest, getRequest, patchRequest, postRequest } from '.';

export const goalsApi = {
  getGoals: async (params?: GetGoalsRequestParams): Promise<ApiGetGoalsResponse> => {
    const requestParams = {
      isPinned: params?.isPinned?.toString() ?? 'false',
      sortedBy: params?.sortBy === 'latest' ? 'LATEST' : 'DUE_DATE',
      page: (params?.page ?? 1) - 1, // 0-based indexing
      size: params?.limit ?? 6,
    };

    return getRequest('/goals/summaries', requestParams);
  },

  // 목표 상세 조회
  getGoal: async (goalId: number): Promise<ApiGoalSummary> => {
    const res = await getRequest(`/goals/${goalId}/summary`);
    return res.result;
  },

  //목표 상세에 대한 할일에 대한 노트, 첨부파일, 링크 조회
  getNotesAttachmentsByGoalId: async (goalId: number): Promise<ApiGoalSummary> => {
    const res = await getRequest(`/goals/${goalId}/detail`);
    return res.result;
  },

  // 목표 생성
  createGoal: async (goalData: GoalFormData): Promise<ApiGoalSummary> => {
    const requestData: CreateGoalRequest = {
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
  updateGoal: async (goalId: number, goalData: Partial<GoalFormData>): Promise<ApiGoalSummary> => {
    const requestData: {
      name?: string;
      color?: string;
      dueDateTime?: string;
    } = {};

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
  updateGoalPinStatus: async (goalId: number, isPinned: boolean): Promise<ApiGoalSummary> => {
    const requestData = {
      isPinned: isPinned,
    };

    return patchRequest(`/goals/${goalId}/pin`, requestData);
  },

  // 목표 삭제
  deleteGoal: async (goalId: number): Promise<void> => {
    return deleteRequest(`/goals/${goalId}`);
  },
};
