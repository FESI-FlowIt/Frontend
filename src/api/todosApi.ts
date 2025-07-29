import { ApiTodo, Todo, TodoCreateRequest, TodoUpdateRequest } from '@/interfaces/todo';

import { todoMapper } from '../lib/todoMapper';

import { deleteRequest, patchRequest, postRequest } from '.';

export const todosApi = {
  // 할 일 생성
  createTodo: async (userId: number, todoData: TodoCreateRequest): Promise<Todo> => {
    const requestData = {
      userId,
      name: todoData.name,
      goalId: Number(todoData.goalId),
    };

    const apiTodo: ApiTodo = await postRequest('/todos', requestData);
    return todoMapper.mapToSingleTodo(apiTodo);
  },

  // 할 일 수정
  updateTodo: async (
    todoId: number,
    userId: number,
    todoData: TodoUpdateRequest,
  ): Promise<Todo> => {
    const requestData = {
      userId,
      goalId: todoData.goalId ? Number(todoData.goalId) : undefined,
      name: todoData.name,
      ...(todoData.isDone !== undefined && { isDone: todoData.isDone }),
    };

    const apiTodo: ApiTodo = await patchRequest(`/todos/${todoId}`, requestData);
    return todoMapper.mapToSingleTodo(apiTodo);
  },

  // 할 일 완료/미완료 토글
  toggleTodoDone: async (todoId: number, userId: number, isDone: boolean): Promise<Todo> => {
    const requestData: { userId: number; isDone: boolean } = {
      userId,
      isDone,
    };

    const apiTodo: ApiTodo = await patchRequest(`/todos/${todoId}/done`, requestData);
    return todoMapper.mapToSingleTodo(apiTodo);
  },

  // 할 일 삭제
  deleteTodo: async (todoId: number, userId: number): Promise<void> => {
    return deleteRequest(`/todos/${todoId}?userId=${userId}`);
  },
};
