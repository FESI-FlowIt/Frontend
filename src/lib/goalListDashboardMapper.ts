import { ApiGoalSummary, GoalSummary } from '@/interfaces/goal';
import { TodoSummary } from '@/interfaces/todo';

// 날짜 차이 계산 함수 (D-Day)
const calculateDDay = (dueDateTime: string): number => {
  const today = new Date();
  const dueDate = new Date(dueDateTime);

  // 시간을 제거하고 날짜만 비교
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

// 날짜 포맷 변환 함수 (ISO string을 YYYY-MM-DD 형태로)
const formatDeadlineDate = (dueDateTime: string): string => {
  const date = new Date(dueDateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const mapApiResponseToGoalSummary = (apiResponse: ApiGoalSummary[]): GoalSummary[] => {
  const mappedGoals: GoalSummary[] = apiResponse.map(apiGoal => {
    const mappedTodos: TodoSummary[] = apiGoal.todos.map(apiTodo => ({
      id: apiTodo.todoId,
      title: apiTodo.todoName,
      isDone: apiTodo.isDone,
    }));

    return {
      goalId: apiGoal.goalId,
      title: apiGoal.goalName,
      color: apiGoal.color,
      dDay: calculateDDay(apiGoal.dueDateTime),
      deadlineDate: formatDeadlineDate(apiGoal.dueDateTime),
      createdAt: apiGoal.createDateTime,
      isPinned: apiGoal.isPinned,
      todos: mappedTodos,
    };
  });

  return mappedGoals;
};
