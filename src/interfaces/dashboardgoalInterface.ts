export type Todo = {
  id: string;
  content: string;
  isDone: boolean;
};

export type GoalSummary = {
  goalId: string;
  title: string;
  dDay: number;
  deadlineDate: string;
  color: string;
  todos: Todo[];
  isPinned: boolean;
  createdAt: string;
};

export type GoalColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink';

export type Goal = {
  id: string;
  title: string;
  color: string;
  todos: {
    id: string;
    title: string;
  }[];
};