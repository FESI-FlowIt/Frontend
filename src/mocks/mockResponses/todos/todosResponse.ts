import { Todo } from '@/interfaces/todo';

export const todosRes: { todos: Todo[] } = {
  todos: [
    {
      todoId: 'todo-1',
      goalId: 'goal-1',
      title: '첫 번째 할 일',
      isDone: false,
      attachment: [],
      notes: [],
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      accumulatedMs: 0,
    },
    {
      todoId: 'todo-2',
      goalId: 'goal-1',
      title: '두 번째 할 일',
      isDone: true,
      attachment: [],
      notes: [],
      createdAt: '2024-01-02T00:00:00.000Z',
      updatedAt: '2024-01-02T00:00:00.000Z',
      accumulatedMs: 3600000, // 1시간
    },
    {
      todoId: 'todo-3',
      goalId: 'goal-2',
      title: '세 번째 할 일',
      isDone: false,
      attachment: [],
      notes: [],
      createdAt: '2024-01-03T00:00:00.000Z',
      updatedAt: '2024-01-03T00:00:00.000Z',
      accumulatedMs: 1800000, // 30분
    },
  ],
};
