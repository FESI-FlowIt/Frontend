import { z } from 'zod';

import { Note } from './note';

export interface Attachment {
  type: 'file' | 'link';
  url: string;
  fileName?: string;
  size?: number;
}

export interface Todo {
  todoId: string;
  goalId: string;
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
  goalId: z.string().min(1, { message: '목표를 선택해 주세요.' }),
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
  goalId: string;
  title: string;
  attachments?: Attachment[];
}

export interface TodoUpdateRequest {
  title?: string;
  isDone?: boolean;
  attachments?: Attachment[];
  goalId?: string;
}

export interface TodoSummary {
  id: string;
  title: string;
  isDone: boolean;
}
