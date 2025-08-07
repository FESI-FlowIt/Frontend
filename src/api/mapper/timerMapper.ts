import {
  ApiStartTimerResponse,
  ApiPauseTimerResponse,
  ApiResumeTimerResponse,
  ApiFinishTimerResponse,
  ApiGetCurrentTimerStatusResponse,
  ApiTotalRunningTimeResponse,
  TimerSession,
  InProgressGoal,
} from '@/interfaces/timer';

export const timerMapper = {
  mapApiToStartedTimer: (data: ApiStartTimerResponse): TimerSession => ({
    sessionId: data.todoTimerId.toString(),
    todoId: data.todoId.toString(),
    startedAt: data.startedDateTime,
    endedAt: null,
    isRunning: true,
    goalId: '',
    goalTitle: '',
    goalColor: '',
    todoContent: '',
  }),

  mapApiToPausedTimer: (data: ApiPauseTimerResponse) => ({
    sessionId: data.todoTimerId.toString(),
    todoId: data.todoId.toString(),
    pausedAt: data.pausedDateTime,
  }),

  mapApiToResumedTimer: (data: ApiResumeTimerResponse) => ({
    sessionId: data.todoTimerId.toString(),
    todoId: data.todoId.toString(),
    resumedAt: data.resumeDateTime,
    totalPausedTime: data.totalPausedTime,
  }),

  mapApiToFinishedTimer: (data: ApiFinishTimerResponse) => ({
    sessionId: data.todoTimerId.toString(),
    todoId: data.todoId.toString(),
    runningTime: data.runningTime,
  }),

  mapApiToCurrentTimerStatus: (
  data: ApiGetCurrentTimerStatusResponse
): TimerSession | null => {
  const session = data.result;
  if (!session || !session.todoTimerId) return null;

  return {
    sessionId: session.todoTimerId.toString(),
    todoId: session.todoId.toString(),
    isRunning: session.isRunningTimer,
    startedAt: '',      // 서버 응답에 없으므로 비워둠
    endedAt: null,
    goalId: session.goalId.toString(),
    goalTitle: '',
    goalColor: '',
    todoContent: '',
  };
},


  mapApiToTotalRunningTime: (data: ApiTotalRunningTimeResponse) => ({
    todoId: data.todoId.toString(),
    totalTime: data.totalRunningTime,
  }),

  mapApiToInProgressGoals: (data: any[]): InProgressGoal[] => {
    return data.map(goal => ({
      goalId: goal.goalId,
      goalName: goal.goalName,
      color: goal.color,
      createDateTime: goal.createDateTime,
      dueDateTime: goal.dueDateTime,
      isPinned: goal.isPinned,
      progressRate: goal.progressRate,
      todos: goal.todos.map((todo: any) => ({
        todoId: todo.todoId,
        todoName: todo.todoName,
        isDone: todo.isDone,
      })),
    }));
  },
};
