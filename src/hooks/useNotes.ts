import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { notesApi } from '@/api/notesApi';
import type { NoteFormData } from '@/interfaces/note';
import type { TodoWithNotes } from '@/interfaces/todo';

export const NOTE_QUERY_KEY = 'notes';
export const TEMP_NOTE_QUERY_KEY = 'tempNote';
export const TODOS_WITH_NOTES_QUERY_KEY = 'todosWithNotes';

// 노트 생성
export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noteData: NoteFormData) => {
      return await notesApi.createNote(noteData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [TODOS_WITH_NOTES_QUERY_KEY] });
    },
  });
};

// 노트 업데이트
export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ noteId, noteData }: { noteId: number; noteData: NoteFormData }) => {
      return await notesApi.updateNote(noteId, noteData);
    },

    onSuccess: () => {
      // 특정 노트의 상세 정보 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [NOTE_QUERY_KEY, 'detail'],
      });
      // 해당 할 일의 노트 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [NOTE_QUERY_KEY, 'todo'],
      });
      // 노트가 있는 할 일 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [TODOS_WITH_NOTES_QUERY_KEY] });
    },

    onError: error => {
      console.error('노트 업데이트 실패:', error);
    },
  });
};

// 노트 삭제
export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noteId: number) => {
      return await notesApi.deleteNote(noteId);
    },

    onSuccess: () => {
      // 모든 노트 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [NOTE_QUERY_KEY],
      });
      // 노트가 있는 할 일 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [TODOS_WITH_NOTES_QUERY_KEY] });
    },

    onError: error => {
      console.error('노트 삭제 실패:', error);
    },
  });
};

// 노트가 있는 할 일 목록 조회 (노트 모아보기)
export const useTodosWithNotes = (goalId?: number) => {
  return useQuery<TodoWithNotes[]>({
    queryKey: [TODOS_WITH_NOTES_QUERY_KEY, goalId],
    queryFn: async () => {
      const response = await notesApi.getTodosWithNotes(goalId);
      return response;
    },
  });
};

// 특정 할 일의 노트 목록 조회
export const useNotesByTodoId = (todoId: number) => {
  return useQuery({
    queryKey: [NOTE_QUERY_KEY, 'todo', todoId],
    queryFn: async () => {
      return await notesApi.getNotesByTodoId(todoId);
    },
    enabled: !!todoId,
  });
};

export const useNoteDetailById = (noteId: number) => {
  return useQuery({
    queryKey: [NOTE_QUERY_KEY, 'detail', noteId],
    queryFn: async () => {
      const note = await notesApi.getNoteDetailById(noteId);
      return note;
    },
    enabled: !!noteId,
  });
};
