import { useMutation, useQueryClient } from '@tanstack/react-query';

import { todosApi } from '@/api/todosApi';
import { TodoCreateRequest, TodoUpdateRequest } from '@/interfaces/todo';

import { GOALS_QUERY_KEY } from './useGoals';
import { useToast } from './useToast';
export const TODOS_QUERY_KEY = ['todos'];

// 할 일 생성
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (todoData: TodoCreateRequest) => {
      return todosApi.createTodo(todoData);
    },
    onSuccess: () => {
      toast.success('할 일이 생성되었어요.');
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...GOALS_QUERY_KEY] });
    },
    onError: error => {
      toast.error('할 일 생성 실패');
      console.error('할 일 생성 실패:', error);
    },
  });
};

// 할 일 수정
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ todoId, data }: { todoId: number; data: TodoUpdateRequest }) => {
      return todosApi.updateTodo(todoId, data);
    },
    onSuccess: () => {
      toast.success('할 일이 수정되었어요.');
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      // 해당 목표의 상세 정보도 무효화
      queryClient.invalidateQueries({ queryKey: [...GOALS_QUERY_KEY] });
    },
    onError: error => {
      toast.error('할 일 수정 실패');
      console.error('할 일 수정 실패:', error);
    },
  });
};

// 할 일 완료/미완료 토글
export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ todoId, isDone }: { todoId: number; isDone: boolean }) => {
      return todosApi.toggleTodoDone(todoId, isDone);
    },
    onSuccess: () => {
      toast.success('할 일 상태가 변경되었어요.');
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      // 해당 목표의 상세 정보도 무효화 (완료율 업데이트를 위해)
      queryClient.invalidateQueries({ queryKey: [...GOALS_QUERY_KEY] });
    },
    onError: error => {
      toast.error('할 일 상태 변경 실패');
      console.error('할 일 상태 변경 실패:', error);
    },
  });
};

// 할 일 삭제
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (todoId: number) => {
      return todosApi.deleteTodo(todoId);
    },
    onSuccess: () => {
      toast.success('할 일이 삭제되었어요.');
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      // 모든 목표 쿼리 무효화 (할일 개수 업데이트를 위해)
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
    },
    onError: error => {
      toast.error('할 일 삭제 실패');
      console.error('할 일 삭제 실패:', error);
    },
  });
};
