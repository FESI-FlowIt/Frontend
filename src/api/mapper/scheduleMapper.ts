import type { AssignedTask, Task } from '@/interfaces/schedule';
import type { AssignedTodoApi, UnassignedTodoApi } from '@/interfaces/schedule';
import dayjs from '@/lib/dayjs';

export const scheduleMapper = {
  mapUnassignedTodosToTasks: (apiTodos: UnassignedTodoApi[]): Task[] => {
    return apiTodos.map(todo => ({
      id: String(todo.todoId),
      title: todo.name,
      color: todo.color,
    }));
  },

  mapAssignedTodosToAssignedTasks: (apiTodos: AssignedTodoApi[]): AssignedTask[] => {
    return apiTodos.map(todo => {
      const startedAt = dayjs(todo.startedDateTime).tz('Asia/Seoul');
      const time = startedAt.format('HH:mm');
      const date = startedAt.format('YYYY-MM-DD');

      return {
        schedId: todo.schedId,
        task: {
          id: String(todo.todoId),
          title: todo.name,
          color: todo.color,
        },
        time,
        date,
      };
    });
  },
};
