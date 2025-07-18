import {
  CreateGoalRequest,
  GetGoalsRequestParams,
  Goal,
  GoalFormData,
  GoalSummary,
  UpdateGoalPinStatusRequest,
  UpdateGoalRequest,
} from '@/interfaces/goal';

export const goalsApi = {
  // 목표 목록 조회
  getGoals: async (
    params?: GetGoalsRequestParams,
  ): Promise<{
    goals: GoalSummary[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }> => {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params?.isPinned !== undefined) searchParams.append('isPinned', params.isPinned.toString());

    const response = await fetch(`/goals?${searchParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch goals');
    }
    return response.json();
  },

  // 목표 상세 조회
  getGoal: async (goalId: string): Promise<Goal> => {
    const response = await fetch(`/goals/${goalId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch goal');
    }
    return response.json();
  },

  // 목표 생성
  createGoal: async (goalData: GoalFormData): Promise<Goal> => {
    const requestData: CreateGoalRequest = {
      title: goalData.title,
      color: goalData.color,
      dueDate: goalData.dueDate.toISOString(),
    };

    const response = await fetch(`/goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Failed to create goal');
    }
    return response.json();
  },

  // 목표 수정
  updateGoal: async (goalId: string, goalData: Partial<GoalFormData>): Promise<Goal> => {
    const requestData: Omit<UpdateGoalRequest, 'goalId'> = {
      ...(goalData.title && { title: goalData.title }),
      ...(goalData.color && { color: goalData.color }),
      ...(goalData.dueDate && { dueDate: goalData.dueDate.toISOString() }),
    };

    const response = await fetch(`/goals/${goalId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Failed to update goal');
    }
    return response.json();
  },

  // 목표 고정 상태 변경
  updateGoalPinStatus: async (goalId: string, isPinned: boolean): Promise<Goal> => {
    const requestData: UpdateGoalPinStatusRequest = {
      goalId,
      isPinned,
    };

    const response = await fetch(`/goals/${goalId}/pin`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isPinned }),
    });

    if (!response.ok) {
      throw new Error('Failed to update goal pin status');
    }
    return response.json();
  },

  // 목표 삭제
  deleteGoal: async (goalId: string): Promise<void> => {
    const response = await fetch(`/goals/${goalId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete goal');
    }
  },
};
