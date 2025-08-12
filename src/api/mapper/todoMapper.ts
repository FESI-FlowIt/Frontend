import { ApiTodo, Todo } from '@/interfaces/todo';

export const todoMapper = {
  mapApiToTodo: (apiTodo: ApiTodo): Todo => {
    return {
      todoId: apiTodo.todoId,
      goalId: apiTodo.goalId,
      title: apiTodo.name || apiTodo.title || '',
      isDone: apiTodo.isDone ?? false,
      createdAt: apiTodo.createdAt || new Date().toISOString(),
      updatedAt: apiTodo.updatedAt || new Date().toISOString(),
      accumulatedMs: apiTodo.accumulatedMs || 0,
      attachment: undefined,
      notes: undefined,
      link: undefined,
    };
  },
};
