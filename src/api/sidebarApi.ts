import { getRequest, patchRequest } from '.';

export const getGoalsSidebar = async (userId: string) => {
  try {
    const data = await getRequest('/goals', { userId });
    return data;
  } catch (err) {
    console.error('Fetch goals-dashboard error', err);
    throw err;
  }
};

export const patchGoalSidebarisPinned = async (goalId: string, isPinned: boolean) => {
  try {
    const data = await patchRequest(`/goals/${goalId}`, { isPinned });
    return data;
  } catch (err) {
    console.error('Fetch updating isPinned of goal error', err);
    throw err;
  }
};
