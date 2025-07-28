import {
  ApiGetGoalsResponse,
  ApiGoalSummary,
  GetGoalsResponse,
  Goal,
  GoalSummary,
} from '@/interfaces/goal';

// API → Frontend 변환
export const goalMapper = {
  // 목표 상세 API → Frontend Goal
  mapToGoal: (apiGoal: ApiGoalSummary): Goal => ({
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

  // 목표 리스트 API → Frontend GetGoalsResponse
  mapToGoalList: (apiResponse: ApiGetGoalsResponse): GetGoalsResponse => {
    const { contents, page, totalPage, totalElement, hasNext, hasPrev } = apiResponse.result;

    const goals: GoalSummary[] = contents.map(goal => ({
      goalId: goal.goalId,
      title: goal.goalName, // goalName → title 변환
      color: goal.color,
      dDay: Math.ceil(
        (new Date(goal.dueDateTime).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
      ), // dDay 계산
      deadlineDate: goal.dueDateTime, // dueDateTime → deadlineDate 변환
      createdAt: goal.createDateTime, // createDateTime → createdAt 변환
      isPinned: goal.isPinned,
      todos:
        goal.todos?.map(todo => ({
          id: todo.todoId,
          title: todo.todoName, // todoName → title 변환
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
};
