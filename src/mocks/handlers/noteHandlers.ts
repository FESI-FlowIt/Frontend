import { http, HttpResponse } from 'msw';

import { CreateNoteRequest, Note, UpdateNoteRequest } from '@/interfaces/note';
import { getNoteDetailById } from '@/mocks/mockResponses/notes/noteDetailsResponse';
import {
  getNotesByTodoId,
  getTodosWithNotesByGoalId,
} from '@/mocks/mockResponses/notes/todosWithNoteResponse';

const notes: Note[] = [];

export const noteHandlers = [
  // 노트 생성 - 실제 API 엔드포인트: POST /todos/{todoId}/notes
  http.post('/todos/:todoId/notes', async ({ params, request }) => {
    const todoId = Number(params.todoId);
    const body = (await request.json()) as CreateNoteRequest | null;

    if (!body) {
      return HttpResponse.json({ message: '잘못된 요청입니다.' }, { status: 400 });
    }

    const newNote = {
      noteId: Date.now(),
      todoId: todoId,
      title: body.title,
      content: body.content,
      wordCount: body.wordCount,
      link: body.link,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    notes.push(newNote);

    return HttpResponse.json({ result: newNote }, { status: 201 });
  }),

  // 노트가 있는 할 일 목록 조회
  http.get('/notes/todos', ({ request }) => {
    const url = new URL(request.url);
    const goalIdParam = url.searchParams.get('goalId');
    const goalId = goalIdParam ? Number(goalIdParam) : undefined;
    const todosWithNotes = getTodosWithNotesByGoalId(goalId);

    return HttpResponse.json(
      {
        result: todosWithNotes,
        count: todosWithNotes.length,
      },
      { status: 200 },
    );
  }),

  // 특정 할 일의 노트 목록 조회 (NoteSummary)
  http.get('/todos/:todoId/notes', ({ params }) => {
    const todoId = Number(params.todoId);
    const todoNotes = getNotesByTodoId(todoId);

    return HttpResponse.json(
      {
        result: todoNotes,
        count: todoNotes.length,
      },
      { status: 200 },
    );
  }),

  // 특정 노트의 상세 정보 조회
  http.get('/notes/:noteId', ({ params }) => {
    const noteId = Number(params.noteId);
    const noteDetail = getNoteDetailById(noteId);

    if (!noteDetail) {
      return HttpResponse.json({ message: '노트를 찾을 수 없습니다.' }, { status: 404 });
    }

    return HttpResponse.json(
      {
        result: noteDetail,
      },
      { status: 200 },
    );
  }),

  // 노트 업데이트
  http.patch('/notes/:noteId', async ({ params, request }) => {
    const noteId = Number(params.noteId);
    const body = (await request.json()) as UpdateNoteRequest | null;

    if (!body) {
      return HttpResponse.json({ message: '잘못된 요청입니다.' }, { status: 400 });
    }

    // 기존 노트 찾기
    const existingNote = getNoteDetailById(noteId);
    if (!existingNote) {
      return HttpResponse.json({ message: '노트를 찾을 수 없습니다.' }, { status: 404 });
    }

    const updatedNote = {
      ...existingNote,
      title: body.title,
      content: body.content,
      wordCount: body.wordCount,
      link: body.link,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json({ result: updatedNote }, { status: 200 });
  }),

  // 노트 삭제
  http.delete('/notes/:noteId', ({ params }) => {
    const noteId = Number(params.noteId);

    // 노트가 존재하는지 확인
    const existingNote = getNoteDetailById(noteId);
    if (!existingNote) {
      return HttpResponse.json({ message: '노트를 찾을 수 없습니다.' }, { status: 404 });
    }

    console.log('MSW: 노트 삭제 성공', { noteId });

    return HttpResponse.json({ message: '노트가 삭제되었습니다.' }, { status: 200 });
  }),
];
