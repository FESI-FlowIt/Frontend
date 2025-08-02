// src/mappers/scheduleMapper.ts
import type { Task, AssignedTask } from '@/interfaces/schedule';
import type { UnassignedTodoApi, AssignedTodoApi } from '@/interfaces/schedule';

export const scheduleMapper = {
  mapUnassignedTodosToTasks: (apiTodos: UnassignedTodoApi[]): Task[] => {
    return apiTodos.map(todo => ({
      id: String(todo.todoId),
      title: todo.name,
      color: todo.color,
    }));
  },

  mapAssignedTodosToAssignedTasks: (apiTodos: AssignedTodoApi[]): AssignedTask[] => {
    return apiTodos.map(todo => ({
        schedId: todo.schedId,
      task: {
        id: String(todo.todoId),
        title: todo.name,
        color: todo.color,
      },
      time: todo.startedDateTime.slice(11, 16), // HH:mm만 추출
    }));
  },
};
