import { postRequest } from '@/api/index';
import { CreateNoteRequest, NoteFormData } from '@/interfaces/note';

export const notesApi = {
  createNote: async (noteData: NoteFormData) => {
    const requestData: CreateNoteRequest = {
      title: noteData.title,
      content: noteData.content,
      wordCount: noteData.wordCount,
      link: noteData.link,
    };

    return postRequest(`/todos/${noteData.todoId}/notes`, requestData);
  },
};
