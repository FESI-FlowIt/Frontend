import { http, HttpResponse } from 'msw';

import { CreateNoteRequest, Note, UpdateNoteRequest } from '@/interfaces/note';
import { getNoteDetailById } from '@/mocks/mockResponses/notes/noteDetailsResponse';
import {
  getNotesByTodoId,
  getTodosWithNotesByGoalId,
} from '@/mocks/mockResponses/notes/todosWithNoteResponse';

const notes: Note[] = [];

export const noteHandlers = [
  // notesApi.createNote 대응: POST /todos/{todoId}/notes
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

  // notesApi.getTodosWithNotes 대응: GET /goals/{goalId}/todos
  http.get('/goals/:goalId/todos', ({ params, request }) => {
    const goalId = Number(params.goalId);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '10');

    const allTodosWithNotes = getTodosWithNotesByGoalId(goalId);

    // 페이지네이션 적용
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedTodos = allTodosWithNotes.slice(startIndex, endIndex);

    const totalPages = Math.ceil(allTodosWithNotes.length / size);

    return HttpResponse.json(
      {
        result: {
          contents: paginatedTodos,
          page: page,
          totalPage: totalPages,
          totalElement: allTodosWithNotes.length,
          hasNext: page < totalPages - 1,
          hasPrev: page > 0,
        },
      },
      { status: 200 },
    );
  }),

  // notesApi.getNotesByTodoId 대응: GET /todos/{todoId}/notes
  http.get('/todos/:todoId/notes', ({ params }) => {
    const todoId = Number(params.todoId);
    const todoNotes = getNotesByTodoId(todoId);

    // ApiNoteSummary 형태로 변환 (updatedAt → modifiedDateTime)
    const apiNotes = todoNotes.map(
      (note: { noteId: number; todoId: number; title: string; updatedAt: string }) => ({
        noteId: note.noteId,
        todoId: note.todoId,
        title: note.title,
        modifiedDateTime: note.updatedAt, // API 스펙에 맞게 필드명 변경
      }),
    );

    return HttpResponse.json(
      {
        result: apiNotes,
        count: apiNotes.length,
      },
      { status: 200 },
    );
  }),

  // notesApi.getNoteDetailById 대응: GET /todos/{todoId}/notes/{noteId}
  http.get('/todos/:todoId/notes/:noteId', ({ params }) => {
    const noteId = Number(params.noteId);
    const todoId = Number(params.todoId);
    const noteDetail = getNoteDetailById(noteId);

    if (!noteDetail) {
      return HttpResponse.json({ message: '노트를 찾을 수 없습니다.' }, { status: 404 });
    }

    // todoId가 일치하는지 확인
    if (noteDetail.todoId !== todoId) {
      return HttpResponse.json(
        { message: '해당 할 일에 속하지 않은 노트입니다.' },
        { status: 404 },
      );
    }

    return HttpResponse.json(
      {
        result: noteDetail,
      },
      { status: 200 },
    );
  }),

  // notesApi.updateNote 대응: PATCH /todos/{todoId}/notes/{noteId}
  http.patch('/todos/:todoId/notes/:noteId', async ({ params, request }) => {
    const noteId = Number(params.noteId);
    const todoId = Number(params.todoId);
    const body = (await request.json()) as UpdateNoteRequest | null;

    if (!body) {
      return HttpResponse.json({ message: '잘못된 요청입니다.' }, { status: 400 });
    }

    // 기존 노트 찾기
    const existingNote = getNoteDetailById(noteId);
    if (!existingNote) {
      return HttpResponse.json({ message: '노트를 찾을 수 없습니다.' }, { status: 404 });
    }

    // todoId가 일치하는지 확인
    if (existingNote.todoId !== todoId) {
      return HttpResponse.json(
        { message: '해당 할 일에 속하지 않은 노트입니다.' },
        { status: 404 },
      );
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

  // notesApi.deleteNote 대응: DELETE /todos/{todoId}/notes/{noteId}
  http.delete('/todos/:todoId/notes/:noteId', ({ params }) => {
    const noteId = Number(params.noteId);
    const todoId = Number(params.todoId);

    // 노트가 존재하는지 확인
    const existingNote = getNoteDetailById(noteId);
    if (!existingNote) {
      return HttpResponse.json({ message: '노트를 찾을 수 없습니다.' }, { status: 404 });
    }

    // todoId가 일치하는지 확인
    if (existingNote.todoId !== todoId) {
      return HttpResponse.json(
        { message: '해당 할 일에 속하지 않은 노트입니다.' },
        { status: 404 },
      );
    }

    console.log('MSW: 노트 삭제 성공', { noteId, todoId });

    return HttpResponse.json({ message: '노트가 삭제되었습니다.' }, { status: 200 });
  }),
];
