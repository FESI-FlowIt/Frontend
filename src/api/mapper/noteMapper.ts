import {
  ApiNoteResponse,
  ApiNoteSummaryListResponse,
  CreateNoteRequest,
  Note,
  NoteFormData,
  NoteSummary,
  UpdateNoteRequest,
} from '@/interfaces/note';
import { ApiTodosWithNotesResponse, TodoWithNotes } from '@/interfaces/todo';

export const noteMapper = {
  // NoteFormData를 CreateNoteRequest로 변환
  mapFormToRequest: (noteData: NoteFormData): CreateNoteRequest => ({
    title: noteData.title,
    content: noteData.content,
    wordCount: noteData.wordCount,
    link: noteData.link,
  }),

  // NoteFormData를 UpdateNoteRequest로 변환
  mapFormToUpdateRequest: (noteData: NoteFormData): UpdateNoteRequest => {
    const mappedData = {
      title: noteData.title,
      content: noteData.content,
      wordCount: noteData.wordCount,
      link: noteData.link,
    };

    return mappedData;
  },

  // API 응답을 Note로 변환
  mapApiResponseToNote: (response: ApiNoteResponse): Note => response.result,

  // API 응답을 NoteSummary 배열로 변환
  mapApiResponseToNoteSummaryList: (response: ApiNoteSummaryListResponse): NoteSummary[] =>
    response.result,

  // 노트 모아보기 API 응답을 TodoWithNotes 배열로 변환
  mapApiResponseToTodosWithNotes: (response: ApiTodosWithNotesResponse): TodoWithNotes[] => {
    const mappedData = response.result;

    return mappedData;
  },
};
