import {
  ApiGetGoalsResponse,
  ApiGoalSummary,
  GetGoalsResponse,
  Goal,
  GoalSummary,
} from '@/interfaces/goal';
import { SidebarGoals, SidebarGoalsResponse } from '@/interfaces/sidebar';
import { TodoSummary } from '@/interfaces/todo';


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
        dDay: Math.ceil(
          (new Date(apiGoal.dueDateTime).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
        ),
        deadlineDate: apiGoal.dueDateTime,
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
      attachment: todo.attachment || [],
      notes:
        todo.notes?.map(note => ({
          noteId: note.noteId || 0,
          todoId: todo.todoId,
          title: note.title,
          content: note.content || '',
          wordCount: note.wordCount || 0,
          createdAt: note.createdAt || '',
          updatedAt: note.updatedAt || '',
          link: note.link || '',
        })) || [],
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
