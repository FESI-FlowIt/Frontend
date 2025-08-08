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
mapApiToPausedTimer: (data: ApiPauseTimerResponse): TimerSession => ({
  sessionId: data.todoTimerId?.toString() ?? '',
  todoId: data.todoId?.toString() ?? '',
  startedAt: '', // 일시정지 응답에 없을 수 있음
  endedAt: data.pausedDateTime ?? '',
  isRunning: false,
  goalId: '',        // 응답 없으면 공란
  goalTitle: '',
  goalColor: '',
  todoContent: '',
}),



  mapApiToResumedTimer: (data: ApiResumeTimerResponse): TimerSession => ({
    sessionId: data.todoTimerId.toString(),
    todoId: data.todoId.toString(),
    startedAt: data.resumeDateTime,
    endedAt: null,
    isRunning: true,
    goalId: '',
    goalTitle: '',
    goalColor: '',
    todoContent: '',
  }),


 mapApiToFinishedTimer: (data: ApiFinishTimerResponse) => ({
  sessionId: data?.todoTimerId?.toString() ?? '',
  todoId: data?.todoId?.toString() ?? '',
  runningTime: data?.runningTime ?? '0',
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
