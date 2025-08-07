import { z } from 'zod';

import { Note } from './note';

export interface Attachment {
  type: 'file' | 'link';
  url: string;
  fileName?: string;
  size?: number;
}

export interface Todo {
  todoId: number;
  goalId: number;
  title: string;
  isDone: boolean;
  attachment?: Attachment[];
  notes?: Note[];
  createdAt: string;
  updatedAt: string;
  accumulatedMs: number;
}

export const todoFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: '할 일 제목을 입력해 주세요.' })
    .max(30, { message: '30자 이내로 입력해 주세요.' }),
  goalId: z.number().min(1, { message: '목표를 선택해 주세요.' }),
  attachments: z
    .array(
      z.object({
        type: z.enum(['file', 'link']),
        url: z.string(),
        fileName: z.string().optional(),
      }),
    )
    .optional(),
});

export type TodoFormData = z.infer<typeof todoFormSchema>;

export interface TodoCreateRequest {
  goalId: number;
  name: string;
  attachments?: Attachment[];
}

export interface TodoUpdateRequest {
  goalId?: number;
  name?: string;
  isDone?: boolean;
  attachments?: Attachment[];
}

export interface TodoSummary {
  id: number;
  title: string;
  isDone: boolean;
}

export interface TodoWithNotes {
  todoId: number;
  title: string;
  isDone: boolean;
  notes: Note[];
  goalId?: number;
  goalTitle?: string;
}

// API Response
export interface ApiTodo {
  todoId: number;
  goalId: number;
  title: string;
  name: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
  accumulatedMs: number;
}

export interface ApiTodoSummary {
  todoId: number;
  todoName: string;
  isDone: boolean;
}
