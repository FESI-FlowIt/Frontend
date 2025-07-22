import { Todo, TodoCreateRequest, TodoUpdateRequest } from '@/interfaces/todo';

export const todosApi = {
  // 할 일 목록 조회
  getTodos: async (
    goalId?: string,
  ): Promise<{
    todos: Todo[];
    totalCount: number;
  }> => {
    const searchParams = new URLSearchParams();
    if (goalId) searchParams.append('goalId', goalId);

    const response = await fetch(`/todos?${searchParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  // 할 일 생성
  createTodo: async (todoData: TodoCreateRequest): Promise<Todo> => {
    const response = await fetch(`/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });

    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return response.json();
  },

  // 할 일 수정
  updateTodo: async (todoId: string, todoData: TodoUpdateRequest): Promise<Todo> => {
    const response = await fetch(`/todos/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });

    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    return response.json();
  },

  // 할 일 삭제
  deleteTodo: async (todoId: string): Promise<void> => {
    const response = await fetch(`/todos/${todoId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  },
};
