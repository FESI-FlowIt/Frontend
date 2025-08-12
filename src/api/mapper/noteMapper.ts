import {
  ApiNoteResponse,
  ApiNoteSummaryListResponse,
  CreateNoteRequest,
  Note,
  NoteFormData,
  NoteSummary,
  UpdateNoteRequest,
} from '@/interfaces/note';
import { ApiTodosWithNotesResponse, GetTodosWithNotesResponse } from '@/interfaces/todo';
import { htmlToJson, jsonToHtml } from '@/lib/sanitizeUtil';

export const noteMapper = {
  // NoteFormData를 CreateNoteRequest로 변환
  mapFormToRequest: (noteData: NoteFormData): CreateNoteRequest => {
    try {
      const sanitizedJsonContent = htmlToJson(noteData.content);

      // JSON 유효성 검증
      try {
        JSON.parse(sanitizedJsonContent);
        console.log('생성 요청: JSON 검증 성공. 길이:', sanitizedJsonContent.length);
        console.log('생성 요청: JSON 앞부분:', sanitizedJsonContent.substring(0, 200));
      } catch (jsonError) {
        console.error('생성된 JSON이 유효하지 않음:', jsonError);
        console.error('문제가 있는 JSON:', sanitizedJsonContent.substring(0, 500));
        throw new Error('Invalid JSON generated from HTML content');
      }

      const requestData = {
        title: noteData.title,
        link: noteData.link,
        content: sanitizedJsonContent, // JSON 문자열로 전송 (서버에서 String 타입 기대)
        wordCount: noteData.wordCount,
      };

      return requestData;
    } catch (error) {
      console.error('노트 요청 데이터 변환 중 오류:', error);
      throw error;
    }
  },

  // NoteFormData를 UpdateNoteRequest로 변환
  mapFormToUpdateRequest: (noteData: NoteFormData): UpdateNoteRequest => {
    try {
      const sanitizedJsonContent = htmlToJson(noteData.content);

      // JSON 유효성 검증
      try {
        JSON.parse(sanitizedJsonContent);
        console.log('수정 요청: JSON 검증 성공. 길이:', sanitizedJsonContent.length);
        console.log('수정 요청: JSON 앞부분:', sanitizedJsonContent.substring(0, 200));
      } catch (jsonError) {
        console.error('생성된 JSON이 유효하지 않음:', jsonError);
        console.error('문제가 있는 JSON:', sanitizedJsonContent.substring(0, 500));
        throw new Error('Invalid JSON generated from HTML content');
      }

      const mappedData = {
        title: noteData.title,
        content: sanitizedJsonContent, // JSON 문자열로 전송 (서버에서 String 타입 기대)
        wordCount: noteData.wordCount,
        link: noteData.link,
      };

      return mappedData;
    } catch (error) {
      console.error('노트 수정 데이터 변환 중 오류:', error);
      throw error;
    }
  },

  // API 응답을 Note로 변환 (JSON content를 HTML로 변환)
  mapApiResponseToNote: (response: ApiNoteResponse): Note => {
    try {
      let htmlContent = '';

      if (typeof response.result.content === 'string') {
        // 문자열인 경우 JSON으로 파싱 시도
        htmlContent = jsonToHtml(response.result.content);
      } else if (response.result.content && typeof response.result.content === 'object') {
        // 객체인 경우 htmlContent 필드 사용
        const contentObj = response.result.content as { htmlContent?: string };
        htmlContent = contentObj.htmlContent || '';
      }

      return {
        ...response.result,
        content: htmlContent,
      };
    } catch (error) {
      console.error('API 응답 변환 중 오류:', error);
      return {
        ...response.result,
        content: '',
      };
    }
  },

  // API 응답을 NoteSummary 배열로 변환
  mapApiResponseToNoteSummaryList: (response: ApiNoteSummaryListResponse): NoteSummary[] => {
    return response.result.map(note => ({
      noteId: note.noteId,
      title: note.title,
      updatedAt: note.modifiedDateTime,
      todoId: note.todoId,
    }));
  },

  // 노트 모아보기 API 응답을 TodoWithNotes 배열로 변환
  mapApiResponseToTodosWithNotes: (
    response: ApiTodosWithNotesResponse,
  ): GetTodosWithNotesResponse => {
    const { contents, page, totalPage, totalElement, hasNext, hasPrev } = response.result;

    return {
      todos: contents,
      pagination: {
        currentPage: page,
        totalPages: totalPage,
        totalCount: totalElement,
        hasNext,
        hasPrev,
      },
    };
  },
};
