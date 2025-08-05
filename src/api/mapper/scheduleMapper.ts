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
  return apiTodos.map(todo => {
    const startedAt = new Date(todo.startedDateTime);
    const time = startedAt.toISOString().slice(11, 16); // HH:mm
    const date = startedAt.toISOString().slice(0, 10);  // YYYY-MM-DD

    return {
      schedId: todo.schedId,
      task: {
        id: String(todo.todoId),
        title: todo.name,
        color: todo.color,
      },
      time,
      date, // ✅ 여기 들어갈 수 있게 됨
    };
  });
},
};
