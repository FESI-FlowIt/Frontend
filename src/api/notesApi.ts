import { deleteRequest, getRequest, patchRequest, postRequest } from '@/api/index';
import { noteMapper } from '@/api/mapper/noteMapper';
import { NoteFormData } from '@/interfaces/note';
import { GetTodosWithNotesRequestParams } from '@/interfaces/todo';

const {
  mapFormToRequest,
  mapFormToUpdateRequest,
  mapApiResponseToNote,
  mapApiResponseToNoteSummaryList,
  mapApiResponseToTodosWithNotes,
} = noteMapper;

export const notesApi = {
  createNote: async (noteData: NoteFormData) => {
    const requestData = mapFormToRequest(noteData);
    return postRequest(`/todos/${noteData.todoId}/notes`, requestData);
  },

  // 노트 업데이트
  updateNote: async (noteId: number, noteData: NoteFormData) => {
    const requestData = mapFormToUpdateRequest(noteData);
    console.log('노트 수정 API 호출 시작:', requestData);
    const response = await patchRequest(`/todos/${noteData.todoId}/notes/${noteId}`, requestData);
    return response;
  },

  // 노트 삭제
  deleteNote: async (noteId: number, todoId: number) => {
    return deleteRequest(`/todos/${todoId}/notes/${noteId}`);
  },

  // 노트 모아보기 - 목표별 노트가 있는 할 일 목록 조회
  getTodosWithNotes: async (goalId?: number, params?: GetTodosWithNotesRequestParams) => {
    if (!goalId) {
      throw new Error('goalId is required');
    }

    const requestParams = {
      page: (params?.page ?? 1) - 1, // 0-based indexing
      size: params?.size ?? 10,
    };

    const response = await getRequest(`/goals/${goalId}/todos`, requestParams);
    return mapApiResponseToTodosWithNotes(response);
  },

  // 특정 할 일의 노트 목록 조회
  getNotesByTodoId: async (todoId: number) => {
    const response = await getRequest(`/todos/${todoId}/notes`);
    return mapApiResponseToNoteSummaryList(response);
  },

  getNoteDetailById: async (noteId: number, todoId: number) => {
    const response = await getRequest(`/todos/${todoId}/notes/${noteId}`);
    return mapApiResponseToNote(response);
  },
};
