import { postRequest } from '@/api/index';
import { noteMapper } from '@/api/mapper/noteMapper';
import { NoteFormData } from '@/interfaces/note';

export const notesApi = {
  createNote: async (noteData: NoteFormData) => {
    const requestData = noteMapper.mapFormToRequest(noteData);

    return postRequest(`/todos/${noteData.todoId}/notes`, requestData);
  },
};
