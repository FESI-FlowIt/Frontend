import { http, HttpResponse } from 'msw';

import { Todo, TodoCreateRequest, TodoUpdateRequest } from '@/interfaces/todo';

import { createStorage } from '../utils/storage';

type MockTodo = Todo;

const STORAGE_KEY = 'todos';
const todoStorage = createStorage<MockTodo>(STORAGE_KEY, []);

const getTodos = () => todoStorage.load();
const saveTodos = (todos: MockTodo[]) => todoStorage.save(todos);

export const todoHandlers = [
  http.get('/todos', ({ request }) => {
    const url = new URL(request.url);
    const goalId = url.searchParams.get('goalId');

    const todos = getTodos();

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
    const todos = getTodos();

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

    const updatedTodos = [...todos, newTodo];
    saveTodos(updatedTodos);
    return HttpResponse.json(newTodo);
  }),

  http.put('/todos/:todoId', async ({ params, request }) => {
    const { todoId } = params as { todoId: string };
    const updateData = (await request.json()) as TodoUpdateRequest;
    const todos = getTodos();

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

    const updatedTodos = [...todos];
    updatedTodos[todoIndex] = updatedTodo;
    saveTodos(updatedTodos);
    return HttpResponse.json(updatedTodo);
  }),

  http.delete('/todos/:todoId', ({ params }) => {
    const { todoId } = params as { todoId: string };
    const todos = getTodos();

    const todoIndex = todos.findIndex(todo => todo.todoId === todoId);
    if (todoIndex === -1) {
      return HttpResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    const updatedTodos = todos.filter(todo => todo.todoId !== todoId);
    saveTodos(updatedTodos);

    return HttpResponse.json({ success: true });
  }),

  http.patch('/todos/:todoId/toggle', ({ params }) => {
    const { todoId } = params as { todoId: string };
    const todos = getTodos();

    const todoIndex = todos.findIndex(todo => todo.todoId === todoId);
    if (todoIndex === -1) {
      return HttpResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    const updatedTodos = [...todos];
    updatedTodos[todoIndex] = {
      ...updatedTodos[todoIndex],
      isDone: !updatedTodos[todoIndex].isDone,
      updatedAt: new Date().toISOString(),
    };

    saveTodos(updatedTodos);

    return HttpResponse.json(updatedTodos[todoIndex]);
  }),

  http.delete('/todos/reset', () => {
    todoStorage.clear();
    return HttpResponse.json({ success: true });
  }),
];
