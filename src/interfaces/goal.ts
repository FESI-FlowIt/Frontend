import { z } from 'zod';

import { Todo } from './todo';

export interface Goal {
  goalId: string;
  title: string;
  color: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  progress: number;
  todos?: Todo[];
}

export const goalFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: '목표명을 입력해 주세요.' })
    .max(30, { message: '30자 이내로 입력해 주세요.' }),
  color: z.string().min(1, { message: '색상을 선택해 주세요.' }),
  dueDate: z
    .date({
      required_error: '마감일을 선택해주세요.',
    })
    .refine(date => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: '오늘 이후의 날짜를 선택해 주세요.',
    }),
});

export type GoalFormData = z.infer<typeof goalFormSchema>;

export interface GoalSummary {
  goalId: string;
  title: string;
  color: string;
  dueDate: string;
  createdAt: string;
  isPinned: boolean;
  progress: number;
  uncompletedTasksPreview: UncompletedTaskPreview[];
}

export interface UncompletedTaskPreview {
  todoId: string;
  goalId: string;
  title: string;
}

//API Request
export interface GetGoalsRequestParams {
  page?: number;
  limit?: number;
  sortBy?: 'latest' | 'dueDate';
  isPinned?: boolean;
}

export interface CreateGoalRequest {
  title: string;
  color: string;
  dueDate: string;
}

export interface UpdateGoalRequest {
  goalId: string;
  title?: string;
  color?: string;
  dueDate?: string;
  isPinned?: boolean;
}

export interface UpdateGoalPinStatusRequest {
  goalId: string;
  isPinned: boolean;
}

export interface DeleteGoalRequest {
  goalId: string;
}
