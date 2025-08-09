import { deleteRequest, getRequest, patchRequest, postRequest } from '@/api/index';
import { noteMapper } from '@/api/mapper/noteMapper';
import { NoteFormData } from '@/interfaces/note';

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
    const response = await patchRequest(`/notes/${noteId}`, requestData);

    return response;
  },

  // 노트 삭제
  deleteNote: async (noteId: number) => {
    return deleteRequest(`/notes/${noteId}`);
  },

  // 노트 모아보기 - 목표별 노트가 있는 할 일 목록 조회
  getTodosWithNotes: async (goalId?: number) => {
    const params = goalId ? `?goalId=${goalId}` : '';
    const response = await getRequest(`/notes/todos${params}`);
    return mapApiResponseToTodosWithNotes(response);
  },

  // 특정 할 일의 노트 목록 조회
  getNotesByTodoId: async (todoId: number) => {
    const response = await getRequest(`/todos/${todoId}/notes`);
    return mapApiResponseToNoteSummaryList(response);
  },

  getNoteDetailById: async (noteId: number) => {
    const response = await getRequest(`/notes/${noteId}`);
    return mapApiResponseToNote(response);
  },
};
