import { useMutation, useQueryClient } from '@tanstack/react-query';

import { todosApi } from '@/api/todosApi';
import { TodoCreateRequest, TodoUpdateRequest } from '@/interfaces/todo';
import { useUserStore } from '@/store/userStore';

import { GOALS_QUERY_KEY } from './useGoals';

export const TODOS_QUERY_KEY = ['todos'];

// 할 일 생성
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  return useMutation({
    mutationFn: async (todoData: TodoCreateRequest) => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      return todosApi.createTodo(user.id, todoData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...GOALS_QUERY_KEY] });
    },
    onError: error => {
      console.error('할 일 생성 실패:', error);
    },
  });
};

// 할 일 수정
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  return useMutation({
    mutationFn: async ({ todoId, data }: { todoId: number; data: TodoUpdateRequest }) => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      return todosApi.updateTodo(todoId, user.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      // 해당 목표의 상세 정보도 무효화
      queryClient.invalidateQueries({ queryKey: [...GOALS_QUERY_KEY] });
    },
    onError: error => {
      console.error('할 일 수정 실패:', error);
    },
  });
};

// 할 일 완료/미완료 토글
export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  return useMutation({
    mutationFn: async ({ todoId, isDone }: { todoId: number; isDone: boolean }) => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      return todosApi.toggleTodoDone(todoId, user.id, isDone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      // 해당 목표의 상세 정보도 무효화 (완료율 업데이트를 위해)
      queryClient.invalidateQueries({ queryKey: [...GOALS_QUERY_KEY] });
    },
    onError: error => {
      console.error('할 일 상태 변경 실패:', error);
    },
  });
};

// 할 일 삭제
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  return useMutation({
    mutationFn: async (todoId: number) => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      return todosApi.deleteTodo(todoId, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      // 모든 목표 쿼리 무효화 (할일 개수 업데이트를 위해)
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
    },
    onError: error => {
      console.error('할 일 삭제 실패:', error);
    },
  });
};
