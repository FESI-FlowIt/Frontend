import { ApiTodo, Todo } from '@/interfaces/todo';

export const todoMapper = {
  mapApiToTodo: (apiTodo: ApiTodo): Todo => ({
    todoId: apiTodo.todoId,
    goalId: apiTodo.goalId,
    title: apiTodo.name || apiTodo.title,
    isDone: apiTodo.isDone,
    createdAt: apiTodo.createdAt,
    updatedAt: apiTodo.updatedAt,
    accumulatedMs: apiTodo.accumulatedMs,
    attachment: undefined,
    notes: undefined,
  }),
};
