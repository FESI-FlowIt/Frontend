import { z } from 'zod';

import { Note, NoteSummary } from './note';

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
  link?: string;
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
  attachment?: Attachment[];
  notes?: Note[];
}

export interface TodoWithNotes {
  todoId: number;
  name: string;
  isDone: boolean;
  note: NoteSummary[];
  goalId?: number;
  goalTitle?: string;
}

export interface GetTodosWithNotesResponse {
  todos: TodoWithNotes[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface GetTodosWithNotesRequestParams {
  page?: number;
  size?: number;
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
  attachment?: Attachment[];
  notes?: Note[];
}

// 노트 모아보기 API 응답
export interface ApiTodosWithNotesResponse {
  result: {
    contents: TodoWithNotes[];
    page: number;
    totalPage: number;
    totalElement: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// 파일 업로드 응답
export interface FileUploadResponse {
  todoId: number;
  filename: string;
}

// 할 일 생성 시 첨부파일용 인터페이스
export interface TodoAttachmentInput {
  type: 'file' | 'link';
  url?: string; // 링크의 경우
  file?: File; // 파일의 경우
  fileName?: string;
}

// 확장된 할 일 생성 요청
export interface TodoCreateWithAttachmentsRequest {
  goalId: number;
  name: string;
  attachments?: TodoAttachmentInput[];
}
