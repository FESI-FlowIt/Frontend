export interface SidebarGoals {
  goalId: number;
  name: string;
  color: string;
  isPinned: boolean;
}

export interface SidebarGoalsResponse {
  result: SidebarGoals[];
}
