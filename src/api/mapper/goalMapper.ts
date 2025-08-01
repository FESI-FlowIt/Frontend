import {
  ApiGetGoalsResponse,
  ApiGoalSummary,
  GetGoalsResponse,
  Goal,
  GoalSummary,
} from '@/interfaces/goal';
import { SidebarGoals, SidebarGoalsResponse } from '@/interfaces/sidebar';
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

export const goalMapper = {
  // 대시보드
  mapApiToGoalSummaries: (apiResponse: ApiGoalSummary[]): GoalSummary[] => {
    return apiResponse.map(apiGoal => {
      const mappedTodos: TodoSummary[] =
        apiGoal.todos?.map(apiTodo => ({
          id: apiTodo.todoId,
          title: apiTodo.todoName,
          isDone: apiTodo.isDone,
        })) || [];

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
  },

  // 목표상세
  mapApiToGoal: (apiGoal: ApiGoalSummary): Goal => ({
    goalId: apiGoal.goalId,
    title: apiGoal.goalName,
    color: apiGoal.color,
    deadlineDate: apiGoal.dueDateTime,
    createdAt: apiGoal.createDateTime,
    isPinned: apiGoal.isPinned,
    todos: apiGoal.todos?.map(todo => ({
      todoId: todo.todoId,
      goalId: apiGoal.goalId,
      title: todo.todoName,
      isDone: todo.isDone,
      attachment: [],
      notes: [],
      createdAt: '',
      updatedAt: '',
      accumulatedMs: 0,
    })),
  }),

  // 목표리스트
  mapApiToGoalList: (apiResponse: ApiGetGoalsResponse): GetGoalsResponse => {
    const { contents, page, totalPage, totalElement, hasNext, hasPrev } = apiResponse.result;

    const goals: GoalSummary[] = contents.map(goal => ({
      goalId: goal.goalId,
      title: goal.goalName,
      color: goal.color,
      dDay: Math.ceil(
        (new Date(goal.dueDateTime).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
      ),
      deadlineDate: goal.dueDateTime,
      isPinned: goal.isPinned,
      createdAt: goal.createDateTime,
      todos:
        goal.todos?.map(todo => ({
          id: todo.todoId,
          title: todo.todoName,
          isDone: todo.isDone,
        })) || [],
    }));

    return {
      goals,
      pagination: {
        currentPage: page,
        totalPages: totalPage,
        totalCount: totalElement,
        hasNext,
        hasPrev,
      },
    };
  },

  // 사이드바
  mapApiToSidebarGoals: (res: SidebarGoalsResponse): SidebarGoals[] => {
    return res.result.map(goal => ({
      goalId: goal.goalId,
      name: goal.name,
      color: goal.color,
      isPinned: goal.isPinned,
    }));
  },
};
