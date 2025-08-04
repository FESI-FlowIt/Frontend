import { http, HttpResponse } from 'msw';

import { CreateNoteRequest, Note } from '@/interfaces/note';

const notes: Note[] = [];

export const noteHandlers = [
  // 노트 생성 - 실제 API 엔드포인트: POST /todos/{todoId}/notes
  http.post('/todos/:todoId/notes', async ({ params, request }) => {
    const todoId = Number(params.todoId);
    const body = (await request.json()) as CreateNoteRequest | null;

    console.log('MSW: 노트 생성 요청', { todoId, body });

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
    console.log('MSW: 노트 생성 성공', newNote);

    return HttpResponse.json({ result: newNote }, { status: 201 });
  }),
];
