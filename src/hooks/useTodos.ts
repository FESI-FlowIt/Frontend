import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { todosApi } from '@/api/todosApi';
import { TodoCreateRequest, TodoUpdateRequest } from '@/interfaces/todo';

export const TODOS_QUERY_KEY = ['todos'];

// 할 일 목록 조회
export const useTodos = (goalId?: string) => {
  return useQuery({
    queryKey: [...TODOS_QUERY_KEY, goalId],
    queryFn: () => todosApi.getTodos(goalId),
    enabled: true, // 항상 활성화
  });
};

// 할 일 생성
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoData: TodoCreateRequest) => todosApi.createTodo(todoData),
    onSuccess: () => {
      // 모든 할 일 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
    onError: error => {
      console.error('할 일 생성 실패:', error);
    },
  });
};

// 할 일 수정
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, data }: { todoId: string; data: TodoUpdateRequest }) =>
      todosApi.updateTodo(todoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
    onError: error => {
      console.error('할 일 수정 실패:', error);
    },
  });
};

// 할 일 완료/미완료 토글
export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, isDone }: { todoId: string; isDone: boolean }) =>
      todosApi.updateTodo(todoId, { isDone }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
    onError: error => {
      console.error('할 일 상태 변경 실패:', error);
    },
  });
};

// 할 일 삭제
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: string) => todosApi.deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
    onError: error => {
      console.error('할 일 삭제 실패:', error);
    },
  });
};
