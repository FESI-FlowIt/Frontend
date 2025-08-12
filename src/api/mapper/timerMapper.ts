import {
  ApiFinishTimerResponse,
  ApiGetCurrentTimerStatusResponse,
  ApiPauseTimerResponse,
  ApiResumeTimerResponse,
  ApiStartTimerResponse,
  InProgressGoal,
  TimerSession,
} from '@/interfaces/timer';

/** 서버가 어느 키로 시간을 주더라도 흡수해서 ISO를 반환 */
function pickStartedIso(obj: any): string | null {
  return (
    obj?.startedDateTime ??
    obj?.startedAt ??
    obj?.resumeDateTime ?? // 재시작 시점이라면 이것도 시작시각으로 취급
    null
  );
}

export const timerMapper = {
  mapApiToStartedTimer: (data: ApiStartTimerResponse): TimerSession => ({
    sessionId: String(data.todoTimerId),
    todoId: String(data.todoId),
    startedDateTime: data.startedDateTime ?? null,
    endedDateTime: null,
    isRunning: true,
    goalId: '',
    goalTitle: '',
    goalColor: '',
    todoContent: '',
  }),

  mapApiToPausedTimer: (data: ApiPauseTimerResponse): TimerSession => ({
    sessionId: String(data.todoTimerId ?? ''),
    todoId: String(data.todoId ?? ''),
    // 일시정지 응답에 시작시각이 없을 수 있으니 null
    startedDateTime: null,
    endedDateTime: data.pausedDateTime ?? null,
    isRunning: false,
    goalId: '',
    goalTitle: '',
    goalColor: '',
    todoContent: '',
  }),

  mapApiToResumedTimer: (data: ApiResumeTimerResponse): TimerSession => ({
    sessionId: String(data.todoTimerId),
    todoId: String(data.todoId),
    // 재시작 시점도 델타 기준이므로 시작시각으로 사용
    startedDateTime: data.resumeDateTime ?? null,
    endedDateTime: null,
    isRunning: true,
    goalId: '',
    goalTitle: '',
    goalColor: '',
    todoContent: '',
  }),

  mapApiToFinishedTimer: (data: ApiFinishTimerResponse) => ({
    sessionId: String(data?.todoTimerId ?? ''),
    todoId: String(data?.todoId ?? ''),
    runningTime: data?.runningTime ?? '0',
  }),

  mapApiToCurrentTimerStatus: (data: ApiGetCurrentTimerStatusResponse): TimerSession | null => {
    const s = data?.result;
    if (!s || !s.todoTimerId) return null;

    return {
      sessionId: String(s.todoTimerId),
      todoId: String(s.todoId),
      isRunning: Boolean(s.isRunningTimer),
      startedDateTime: pickStartedIso(s),
      endedDateTime: null,
      goalId: String(s.goalId),
      goalTitle: '',
      goalColor: '',
      todoContent: '',
    };
  },

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
