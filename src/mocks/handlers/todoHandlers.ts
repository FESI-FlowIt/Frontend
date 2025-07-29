import { http, HttpResponse } from 'msw';

import { Todo, TodoCreateRequest, TodoUpdateRequest } from '@/interfaces/todo';
import { todosRes } from '@/mocks/mockResponses/todos/todosResponse';

type MockTodo = Todo;

export const todoHandlers = [
  http.get('/todos', ({ request }) => {
    const url = new URL(request.url);
    const goalId = url.searchParams.get('goalId');

    const todos = todosRes.todos;

    let filteredTodos = todos;
    if (goalId) {
      filteredTodos = todos.filter(todo => todo.goalId === Number(goalId));
    }
    return HttpResponse.json({
      todos: filteredTodos,
      totalCount: filteredTodos.length,
    });
  }),

  http.post('/todos', async ({ request }) => {
    const requestData = (await request.json()) as TodoCreateRequest;

    const newTodo: MockTodo = {
      todoId: todosRes.todos.length + 1,
      goalId: requestData.goalId,
      title: requestData.name,
      isDone: false,
      attachment: requestData.attachments || [],
      notes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      accumulatedMs: 0,
    };

    // 목 데이터에 새로운 Todo 추가
    todosRes.todos.push(newTodo);

    return HttpResponse.json(newTodo);
  }),

  http.put('/todos/:todoId', async ({ params, request }) => {
    const { todoId } = params as { todoId: string };
    const updateData = (await request.json()) as TodoUpdateRequest;
    const todos = todosRes.todos;
    const todoIdNumber = Number(todoId);

    const todoIndex = todos.findIndex(todo => todo.todoId === todoIdNumber);
    if (todoIndex === -1) {
      return HttpResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    const updatedTodo = {
      ...todos[todoIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    if (updateData.attachments) {
      updatedTodo.attachment = updateData.attachments;
    }

    // Mock 환경에서는 실제 목 데이터를 업데이트
    todos[todoIndex] = updatedTodo;
    return HttpResponse.json(updatedTodo);
  }),

  http.delete('/todos/:todoId', ({ params }) => {
    const { todoId } = params as { todoId: string };
    const todos = todosRes.todos;
    const todoIdNumber = Number(todoId);
    const todoIndex = todos.findIndex(todo => todo.todoId === todoIdNumber);
    if (todoIndex === -1) {
      return HttpResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    // Mock 환경에서는 실제 목 데이터에서 제거
    todosRes.todos = todos.filter(todo => todo.todoId !== todoIdNumber);

    return HttpResponse.json({ success: true });
  }),

  http.patch('/todos/:todoId/toggle', ({ params }) => {
    const { todoId } = params as { todoId: string };
    const todos = todosRes.todos;
    const todoIdNumber = Number(todoId);

    const todoIndex = todos.findIndex(todo => todo.todoId === todoIdNumber);
    if (todoIndex === -1) {
      return HttpResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    todos[todoIndex] = {
      ...todos[todoIndex],
      isDone: !todos[todoIndex].isDone,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(todos[todoIndex]);
  }),

  http.delete('/todos/reset', () => {
    // Mock 환경에서는 빈 배열로 초기화
    todosRes.todos = [];
    return HttpResponse.json({ success: true });
  }),
];
