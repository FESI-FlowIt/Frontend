import { TodoSummary } from '@/interfaces/todo';

const calculateProgress = (todos: TodoSummary[]) => {
  if (todos.length === 0) return 0;
  const completedTodos = todos.filter(todo => todo.isDone).length;
  return Math.round((completedTodos / todos.length) * 100);
};

export default calculateProgress;
