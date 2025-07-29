import { getRequest, patchRequest } from '.';

export const getGoalsSidebar = async (userId: number) => {
  try {
    const response = await getRequest('/goals', { userId });
    return response.result || [];
  } catch (err) {
    console.error('Fetch goals-dashboard error', err);
    throw err;
  }
};

export const patchGoalSidebarisPinned = async (
  goalId: number,
  isPinned: boolean,
  userId: number,
) => {
  try {
    const data = await patchRequest(`/goals/${goalId}/pin`, { userId, isPinned });
    return data;
  } catch (err) {
    console.error('Fetch updating isPinned of goal error', err);
    throw err;
  }
};
