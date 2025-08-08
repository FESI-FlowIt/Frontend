export interface ApiStartTimerRequest {
  todoId: number;
}

export interface ApiStartTimerResponse {
  todoTimerId: number;
  todoId: number;
  startedDateTime: string;
}

export interface TimerSession {
  sessionId: string;
  todoId: string;
  startedAt: string | null; // ✅ 이렇게 변경
  endedAt: string | null;
  isRunning: boolean;
  goalId: string;
  goalTitle: string;
  goalColor: string;
  todoContent: string;
}


export interface ApiPauseTimerResponse {
  todoTimerId: number;
  todoId: number;
  pausedDateTime: string;
}

export interface ApiResumeTimerResponse {
  todoTimerId: number;
  todoId: number;
  resumeDateTime: string;
  totalPausedTime: number;
}

export interface ApiFinishTimerResponse {
  todoTimerId: number;
  todoId: number;
  runningTime: string;
}

export interface ApiGetCurrentTimerStatusResponse {
  code: string;
  message: string;
  result: {
    userId: number;
    todoTimerId: number;
    isRunningTimer: boolean;
    todoId: number;
    goalId: number;
  };
}


export interface ApiTotalRunningTimeResponse {
  todoId: number;
  totalRunningTime: string;
}

export interface InProgressTodo {
  todoId: number;
  todoName: string;
  isDone: boolean;
}

export interface InProgressGoal {
  goalId: number;
  goalName: string;
  color: string;
  createDateTime: string;
  dueDateTime: string;
  isPinned: boolean;
  progressRate: number;
  todos: InProgressTodo[];
}
