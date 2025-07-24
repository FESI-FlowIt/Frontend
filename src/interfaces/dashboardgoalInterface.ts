export interface Todo {
  id: string;
  content: string;
  isDone: boolean;
}

export interface GoalSummary {
  goalId: string;
  title: string;
  dDay: number;
  deadlineDate: string;
  color: string;
  todos: Todo[];
  isPinned: boolean;
  createdAt: string;
}

export type GoalColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink';

export interface Goal {
  id: string;
  title: string;
  color: string;
  todos: Todo[];
}
