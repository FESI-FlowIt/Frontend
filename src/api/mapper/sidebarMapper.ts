import { SidebarGoals, SidebarGoalsResponse } from '@/interfaces/sidebar';

export const mapToSidebarGoals = (res: SidebarGoalsResponse): SidebarGoals[] => {
  return res.result.map(goal => ({
    goalId: goal.goalId,
    name: goal.name,
    color: goal.color,
    isPinned: goal.isPinned,
  }));
};
