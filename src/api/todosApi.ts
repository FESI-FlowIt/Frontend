import { todoMapper } from '@/api/mapper/todoMapper';
import { ApiTodo, Todo, TodoCreateRequest, TodoUpdateRequest } from '@/interfaces/todo';

import { deleteRequest, patchRequest, postRequest } from '.';

export const todosApi = {
  // 할 일 생성
  createTodo: async (todoData: TodoCreateRequest): Promise<Todo> => {
    const requestData = {
      name: todoData.name,
      goalId: Number(todoData.goalId),
    };

    const apiTodo: ApiTodo = await postRequest('/todos', requestData);
    return todoMapper.mapApiToTodo(apiTodo);
  },

  // 할 일 수정
  updateTodo: async (todoId: number, todoData: TodoUpdateRequest): Promise<Todo> => {
    const requestData = {
      goalId: todoData.goalId ? Number(todoData.goalId) : undefined,
      name: todoData.name,
      ...(todoData.isDone !== undefined && { isDone: todoData.isDone }),
    };

    const apiTodo: ApiTodo = await patchRequest(`/todos/${todoId}`, requestData);
    return todoMapper.mapApiToTodo(apiTodo);
  },

  // 할 일 완료/미완료 토글
  toggleTodoDone: async (todoId: number, isDone: boolean): Promise<Todo> => {
    const requestData: { isDone: boolean } = {
      isDone,
    };

    const apiTodo: ApiTodo = await patchRequest(`/todos/${todoId}/done`, requestData);
    return todoMapper.mapApiToTodo(apiTodo);
  },

  // 할 일 삭제
  deleteTodo: async (todoId: number): Promise<void> => {
    return deleteRequest(`/todos/${todoId}`);
  },
};
