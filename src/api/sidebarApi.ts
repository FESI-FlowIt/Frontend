import { getRequest, patchRequest } from '.';

export const getGoalsSidebar = async () => {
  try {
    const data = await getRequest('/goals');
    return data;
  } catch (err) {
    console.error('Fetch goals-dashboard error', err);
    throw err;
  }
};

export const patchGoalSidebarisPinned = async (goalId: number, isPinned: boolean) => {
  try {
    const data = await patchRequest(`/goals/${goalId}/pin`, { isPinned });
    return data;
  } catch (err) {
    console.error('Fetch updating isPinned of goal error', err);
    throw err;
  }
};
