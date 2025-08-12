import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { notesApi } from '@/api/notesApi';
import type { NoteFormData } from '@/interfaces/note';
import type { GetTodosWithNotesResponse, TodoWithNotes } from '@/interfaces/todo';

import { useToast } from './useToast';

export const NOTE_QUERY_KEY = 'notes';
export const TEMP_NOTE_QUERY_KEY = 'tempNote';
export const TODOS_WITH_NOTES_QUERY_KEY = 'todosWithNotes';

// 노트 생성
export const useCreateNote = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (noteData: NoteFormData) => {
      return await notesApi.createNote(noteData);
    },

    onSuccess: () => {
      toast.success('노트가 생성되었어요.');
      queryClient.invalidateQueries({ queryKey: [NOTE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [TODOS_WITH_NOTES_QUERY_KEY] });
      // 목표 관련 쿼리 무효화
      queryClient.invalidateQueries({
        predicate: query => {
          const queryKey = query.queryKey as string[];
          return queryKey[0] === 'goals'; // GOALS_QUERY_KEY[0]와 매치
        },
      });
    },
    onError: error => {
      toast.error('노트 생성에 실패했어요.');
      console.error('노트 생성 실패:', error);
    },
  });
};

// 노트 업데이트
export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ noteId, noteData }: { noteId: number; noteData: NoteFormData }) => {
      return await notesApi.updateNote(noteId, noteData);
    },

    onSuccess: () => {
      toast.success('노트가 수정되었어요.');
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

      // 목표 관련 쿼리 무효화
      queryClient.invalidateQueries({
        predicate: query => {
          const queryKey = query.queryKey as string[];
          return queryKey[0] === 'goals'; // GOALS_QUERY_KEY[0]와 매치
        },
      });
    },

    onError: error => {
      toast.error('노트 업데이트 실패');
      console.error('노트 업데이트 실패:', error);
    },
  });
};

// 노트 삭제
export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ noteId, todoId }: { noteId: number; todoId: number }) => {
      return await notesApi.deleteNote(noteId, todoId);
    },

    onSuccess: (_, { noteId, todoId }) => {
      toast.success('노트가 삭제되었어요.');

      // 모든 노트 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [NOTE_QUERY_KEY],
      });

      // 노트가 있는 할 일 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [TODOS_WITH_NOTES_QUERY_KEY] });

      // 목표 관련 쿼리 무효화
      queryClient.invalidateQueries({
        predicate: query => {
          const queryKey = query.queryKey as string[];
          return queryKey[0] === 'goals'; // GOALS_QUERY_KEY[0]와 매치
        },
      });

      // 특정 todo의 노트 목록 쿼리 데이터를 빈 배열로 설정
      queryClient.setQueryData([NOTE_QUERY_KEY, 'todo', todoId], []);

      // 삭제된 노트의 상세 쿼리 데이터 제거
      queryClient.removeQueries({
        queryKey: [NOTE_QUERY_KEY, 'detail', noteId, todoId],
      });
    },

    onError: error => {
      toast.error('노트 삭제 실패');
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

      // 새로운 pagination 구조 처리
      if (
        response &&
        typeof response === 'object' &&
        'todos' in response &&
        'pagination' in response
      ) {
        const paginatedResponse = response as GetTodosWithNotesResponse;
        return paginatedResponse.todos;
      }

      // 응답이 배열이면 그대로 반환 (이전 구조 호환성)
      if (Array.isArray(response)) {
        return response;
      }

      // 응답이 객체이고 result 속성이 있는 경우 (이전 구조 호환성)
      if (response && typeof response === 'object' && 'result' in response) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = (response as any).result;
        if (Array.isArray(result)) {
          return result;
        }
      }

      // 기본값으로 빈 배열 반환
      console.warn('useTodosWithNotes: 예상하지 못한 응답 형식:', response);
      return [];
    },
    enabled: !!goalId && goalId > 0, // goalId가 유효할 때만 쿼리 실행
  });
};

// 특정 할 일의 노트 목록 조회
export const useNotesByTodoId = (todoId: number) => {
  return useQuery({
    queryKey: [NOTE_QUERY_KEY, 'todo', todoId],
    queryFn: async () => {
      const result = await notesApi.getNotesByTodoId(todoId);
      return result || [];
    },
    enabled: !!todoId,
  });
};

export const useNoteDetailById = (noteId: number, todoId: number) => {
  return useQuery({
    queryKey: [NOTE_QUERY_KEY, 'detail', noteId, todoId],
    queryFn: async () => {
      const note = await notesApi.getNoteDetailById(noteId, todoId);
      return note || null; // undefined인 경우 null 반환
    },
    enabled: !!noteId && !!todoId,
  });
};
