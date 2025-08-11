import { z } from 'zod';
export const noteFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: '제목을 입력해 주세요.' })
    .max(30, { message: '30자 이내로 입력해 주세요.' }),
  content: z.string().min(1, { message: '내용을 입력해 주세요.' }),
  wordCount: z.number().min(0, { message: '단어 수는 0 이상이어야 합니다.' }),
});

export type NoteFormData = z.infer<typeof noteFormSchema> & {
  todoId: number;
  link?: string;
};
export interface Note {
  noteId: number;
  todoId: number;
  title: string;
  content: string;
  wordCount: number;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteSummary {
  noteId: number;
  todoId: number;
  title: string;
  updatedAt: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  wordCount: number;
  link?: string;
}

export interface UpdateNoteRequest {
  title: string;
  content: string;
  wordCount: number;
  link?: string;
}

// API Response 인터페이스들
export interface ApiNoteResponse {
  result: Note;
}

export interface ApiNoteSummaryListResponse {
  result: NoteSummary[];
  count: number;
}
