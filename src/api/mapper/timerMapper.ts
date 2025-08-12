// timerMapper.ts
import {
  ApiFinishTimerResponse,
  ApiGetCurrentTimerStatusResponse,
  ApiPauseTimerResponse,
  ApiResumeTimerResponse,
  ApiStartTimerResponse,
  InProgressGoal,
  TimerSession,
} from '@/interfaces/timer';

function pickStartedIso(obj: any): string | null {
  return (
    obj?.startedDateTime ??
    obj?.startedAt ??
    obj?.resumeDateTime ??
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
    runningTime: '00:00:00',
    goalId: '',
    goalTitle: '',
    goalColor: '',
    todoContent: '',
  }),

  mapApiToPausedTimer: (data: ApiPauseTimerResponse): TimerSession => ({
    sessionId: String(data.todoTimerId ?? ''),
    todoId: String(data.todoId ?? ''),
    startedDateTime: null,
    endedDateTime: data.pausedDateTime ?? null,
    isRunning: false,
    runningTime: '00:00:00',
    goalId: '',
    goalTitle: '',
    goalColor: '',
    todoContent: '',
  }),

  mapApiToResumedTimer: (data: ApiResumeTimerResponse): TimerSession => ({
    sessionId: String(data.todoTimerId),
    todoId: String(data.todoId),
    startedDateTime: data.resumeDateTime ?? null,
    endedDateTime: null,
    isRunning: true,
    runningTime: '00:00:00',
    goalId: '',
    goalTitle: '',
    goalColor: '',
    todoContent: '',
  }),

  mapApiToFinishedTimer: (data: ApiFinishTimerResponse): TimerSession => ({
    sessionId: String(data.todoTimerId ?? ''),
    todoId: String(data.todoId ?? ''),
    startedDateTime: null,
    endedDateTime: null,
    isRunning: false,
    runningTime: data.runningTime ?? '00:00:00',
    goalId: '',
    goalTitle: '',
    goalColor: '',
    todoContent: '',
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
      runningTime: '00:00:00',
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
