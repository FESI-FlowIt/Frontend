import { CreateNoteRequest, NoteFormData } from '@/interfaces/note';

export const noteMapper = {
  // NoteFormData를 CreateNoteRequest로 변환
  mapFormToRequest: (noteData: NoteFormData): CreateNoteRequest => ({
    title: noteData.title,
    content: noteData.content,
    wordCount: noteData.wordCount,
    link: noteData.link,
  }),
};
