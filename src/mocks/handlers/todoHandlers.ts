import { http, HttpResponse } from 'msw';

import { Todo, TodoCreateRequest, TodoUpdateRequest } from '@/interfaces/todo';

import { createStorage } from '../utils/storage';

type MockTodo = Todo;

const STORAGE_KEY = 'todos';
const todoStorage = createStorage<MockTodo>(STORAGE_KEY, []);
let todos = todoStorage.load();

export const todoHandlers = [
  http.get('/todos', ({ request }) => {
    const url = new URL(request.url);
    const goalId = url.searchParams.get('goalId');

    todos = todoStorage.load();

    let filteredTodos = todos;
    if (goalId) {
      filteredTodos = todos.filter(todo => todo.goalId === goalId);
    }
    return HttpResponse.json({
      todos: filteredTodos,
      totalCount: filteredTodos.length,
    });
  }),

  http.post('/todos', async ({ request }) => {
    const requestData = (await request.json()) as TodoCreateRequest;
    todos = todoStorage.load();

    const newTodo: MockTodo = {
      todoId: Date.now().toString(),
      goalId: requestData.goalId,
      title: requestData.title,
      isDone: false,
      attachment: requestData.attachments || [],
      notes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      accumulatedMs: 0,
    };

    todos.push(newTodo);
    todoStorage.save(todos);
    return HttpResponse.json(newTodo);
  }),

  http.put('/todos/:todoId', async ({ params, request }) => {
    const { todoId } = params as { todoId: string };
    const updateData = (await request.json()) as TodoUpdateRequest;
    todos = todoStorage.load();

    const todoIndex = todos.findIndex(todo => todo.todoId === todoId);
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

    todos[todoIndex] = updatedTodo;
    todoStorage.save(todos);
    return HttpResponse.json(todos[todoIndex]);
  }),

  http.delete('/todos/:todoId', ({ params }) => {
    const { todoId } = params as { todoId: string };

    todos = todoStorage.load();

    const todoIndex = todos.findIndex(todo => todo.todoId === todoId);
    if (todoIndex === -1) {
      return HttpResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    todoStorage.save(todos);

    return HttpResponse.json({ success: true });
  }),

  http.patch('/todos/:todoId/toggle', ({ params }) => {
    const { todoId } = params as { todoId: string };

    todos = todoStorage.load();

    const todoIndex = todos.findIndex(todo => todo.todoId === todoId);
    if (todoIndex === -1) {
      return HttpResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    todos[todoIndex].isDone = !todos[todoIndex].isDone;
    todos[todoIndex].updatedAt = new Date().toISOString();

    todoStorage.save(todos);

    return HttpResponse.json(todos[todoIndex]);
  }),

  http.delete('/todos/reset', () => {
    todoStorage.clear();
    todos = [];
    return HttpResponse.json({ success: true });
  }),
];
