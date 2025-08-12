import { create } from 'zustand';

import { Attachment } from '@/interfaces/todo';

interface TodoWithAttachments {
  todoId: number;
  notes?: unknown[];
  attachment?: Attachment[];
  links?: { url: string }[]; // API 응답의 links 필드
  files?: { url: string; name?: string; filename?: string }[]; // API 응답의 files 필드 (name 또는 filename)
}

interface TodoAttachmentsState {
  attachmentsByTodo: Record<
    number,
    {
      hasNotes: boolean;
      links: Attachment[]; // 링크 정보 (URL 필요)
      files: Attachment[]; // 파일 정보 (다운로드 필요)
    }
  >;
  isLoading: boolean;
  error: string | null;

  setAttachments: (goalId: number, todos: TodoWithAttachments[]) => void;
  clearAttachments: () => void;

  hasNotes: (todoId: number) => boolean;
  hasLinks: (todoId: number) => boolean;
  hasFiles: (todoId: number) => boolean;
  getLinks: (todoId: number) => Attachment[];
  getFiles: (todoId: number) => Attachment[];
}

export const useTodoAttachmentsStore = create<TodoAttachmentsState>((set, get) => ({
  attachmentsByTodo: {},
  isLoading: false,
  error: null,

  setAttachments: (goalId: number, todos: TodoWithAttachments[]) => {
    const attachmentsByTodo: Record<
      number,
      {
        hasNotes: boolean;
        links: Attachment[];
        files: Attachment[];
      }
    > = {};

    // API 응답을 todoId 기준으로 정리
    todos.forEach(todo => {
      // attachment 배열에서 링크/파일 필터링 (기존 방식)
      const attachmentLinks =
        todo.attachment?.filter((att: Attachment) => att.type === 'link') || [];
      const attachmentFiles =
        todo.attachment?.filter((att: Attachment) => att.type === 'file') || [];

      // API 응답의 links, files 필드 처리 (새로운 방식)
      const apiLinks =
        todo.links?.map(link => ({
          type: 'link' as const,
          url: link.url,
          title: link.url,
        })) || [];

      const apiFiles =
        todo.files?.map(file => ({
          type: 'file' as const,
          url: file.url,
          fileName: file.name, // name 우선, filename은 fallback
        })) || [];

      attachmentsByTodo[todo.todoId] = {
        hasNotes: (todo.notes?.length || 0) > 0,
        links: [...attachmentLinks, ...apiLinks], // 두 방식 모두 지원
        files: [...attachmentFiles, ...apiFiles], // 두 방식 모두 지원
      };
    });

    set({ attachmentsByTodo, isLoading: false, error: null });
  },

  clearAttachments: () => {
    set({ attachmentsByTodo: {}, isLoading: false, error: null });
  },

  hasNotes: (todoId: number) => {
    const { attachmentsByTodo } = get();
    return attachmentsByTodo[todoId]?.hasNotes || false;
  },

  hasLinks: (todoId: number) => {
    const { attachmentsByTodo } = get();
    const hasLinks = (attachmentsByTodo[todoId]?.links?.length || 0) > 0;
    return hasLinks;
  },

  hasFiles: (todoId: number) => {
    const { attachmentsByTodo } = get();
    return (attachmentsByTodo[todoId]?.files?.length || 0) > 0;
  },

  getLinks: (todoId: number) => {
    const { attachmentsByTodo } = get();
    return attachmentsByTodo[todoId]?.links || [];
  },

  getFiles: (todoId: number) => {
    const { attachmentsByTodo } = get();
    return attachmentsByTodo[todoId]?.files || [];
  },
}));
