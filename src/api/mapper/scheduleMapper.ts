import type { Task, AssignedTask } from '@/interfaces/schedule';
import type { UnassignedTodoApi, AssignedTodoApi } from '@/interfaces/schedule';
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
    const time = startedAt.format('HH:mm'); // 한국 시간 기준
    const date = startedAt.format('YYYY-MM-DD'); // 한국 시간 기준

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
}, // ← 여기!
};
