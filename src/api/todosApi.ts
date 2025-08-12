import { todoMapper } from '@/api/mapper/todoMapper';
import {
  ApiTodo,
  FileUploadResponse,
  Todo,
  TodoCreateRequest,
  TodoUpdateRequest,
} from '@/interfaces/todo';

import { deleteRequest, patchRequest, postRequest } from '.';

export const todosApi = {
  // 할 일 생성
  createTodo: async (todoData: TodoCreateRequest): Promise<Todo> => {
    const requestData = {
      name: todoData.name,
      goalId: Number(todoData.goalId),
    };

    const response = await postRequest('/todos', requestData);
    const apiTodo: ApiTodo = response.result; // result 부분만 추출
    return todoMapper.mapApiToTodo(apiTodo);
  },

  addLinkToTodo: async (todoId: number, link: string): Promise<string> => {
    const requestData = {
      link,
    };

    const apiTodo = await postRequest(`/todos/${todoId}/link`, requestData);
    return apiTodo.result;
  },

  addFileToTodo: async (todoId: number, file: File): Promise<FileUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response: FileUploadResponse = await postRequest(`/todos/${todoId}/file`, formData);
    return response;
  },

  // 다중 파일 업로드 (필요한 경우)
  addFilesToTodo: async (todoId: number, files: File[]): Promise<FileUploadResponse[]> => {
    const uploadPromises = files.map(file => todosApi.addFileToTodo(todoId, file));
    return Promise.all(uploadPromises);
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
