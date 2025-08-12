// timerApi.ts
import { getRequest, patchRequest, postRequest } from '@/api';
import { timerMapper } from '@/api/mapper/timerMapper';
import {
  ApiFinishTimerRequest,
  ApiFinishTimerResponse,
  ApiGetCurrentTimerStatusResponse,
  ApiPauseTimerResponse,
  ApiResumeTimerResponse,
  ApiStartTimerRequest,
  ApiStartTimerResponse,
  InProgressGoal,
  TimerSession,
} from '@/interfaces/timer';

/** ---- helpers: 날짜 표준화(ms) ---- */
const toMs = (v?: string | number | null): number | undefined => {
  if (v == null) return undefined;
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string') {
    const t = Date.parse(v);
    return Number.isFinite(t) ? t : undefined;
  }
  return undefined;
};

const normalizeFinishBody = (body: ApiFinishTimerRequest) => {
  const startedAtMs = toMs((body as any).startedAt ?? (body as any).startedAtMs);
  const finishedAtMs = toMs((body as any).finishedAt ?? (body as any).finishedAtMs);
  const resumes = (body as any).resumes as (string | number)[] | undefined;
  const pauses = (body as any).pauses as (string | number)[] | undefined;

  const resumesMs = Array.isArray(resumes)
    ? (resumes.map(toMs).filter(Boolean) as number[])
    : undefined;
  const pausesMs = Array.isArray(pauses)
    ? (pauses.map(toMs).filter(Boolean) as number[])
    : undefined;

  const segments = (body as any).segments as
    | { startAt: string | number; endAt: string | number }[]
    | undefined;
  const segmentsMs = Array.isArray(segments)
    ? (segments
        .map(s => ({ startAtMs: toMs(s.startAt), endAtMs: toMs(s.endAt) }))
        .filter(s => s.startAtMs && s.endAtMs) as { startAtMs: number; endAtMs: number }[])
    : undefined;

  return {
    ...body,
    startedAtMs,
    finishedAtMs,
    resumesMs,
    pausesMs,
    segmentsMs,
    clientSentAtMs: Date.now(),
    clientTzOffsetMin: new Date().getTimezoneOffset(),
  };
};
/** ---------------------------------- */

export const timerApi = {
  startTimer: async (body: ApiStartTimerRequest): Promise<TimerSession> => {
    const data = await postRequest('/todo-timers', body);
    const validCodes = ['0000', '0201'];
    if (!validCodes.includes(data?.code)) {
      throw new Error(`타이머 시작 실패: ${data?.message ?? '알 수 없는 오류'}`);
    }
    const result: ApiStartTimerResponse | undefined = data?.result;
    if (!result || !result.todoTimerId) {
      throw new Error('Invalid response: todoTimerId is missing');
    }
    return timerMapper.mapApiToStartedTimer(result);
  },

  pauseTimer: async (todoTimerId: number): Promise<TimerSession> => {
    const data: ApiPauseTimerResponse = await postRequest(`/todo-timers/${todoTimerId}/pause`, {});
    return timerMapper.mapApiToPausedTimer(data);
  },

  pauseTimerKeepalive(todoTimerId: number) {
    postRequest(`/todo-timers/${todoTimerId}/pause`, {}).catch(() => {});
  },

  resumeTimer: async (todoTimerId: number): Promise<TimerSession> => {
    const data: any = await patchRequest(`/todo-timers/${todoTimerId}/resume`);
    if (data?.code && data.code !== '0000') {
      throw new Error(data.message || '타이머 재시작 실패');
    }
    const payload: ApiResumeTimerResponse = data?.result ?? data;
    if (!payload?.todoTimerId) {
      throw new Error('Invalid response: todoTimerId is missing');
    }
    return timerMapper.mapApiToResumedTimer(payload);
  },

  finishTimer: async (todoTimerId: number, body: ApiFinishTimerRequest): Promise<TimerSession> => {
    const normalized = normalizeFinishBody(body);
    const data: any = await patchRequest(`/todo-timers/${todoTimerId}/finish`, normalized);
    if (data?.code && data.code !== '0000') {
      throw new Error(data?.message || '타이머 종료 실패');
    }
    const payload: ApiFinishTimerResponse = data?.result ?? data;
    if (!payload?.todoTimerId) {
      throw new Error('Invalid response: todoTimerId is missing');
    }
    return timerMapper.mapApiToFinishedTimer(payload);
  },

  getCurrentTimerStatus: async (): Promise<TimerSession | null> => {
    const res: ApiGetCurrentTimerStatusResponse = await getRequest('/todo-timers/user');
    return timerMapper.mapApiToCurrentTimerStatus(res);
  },

  getTotalRunningTime: async (todoId: number) => {
    const data = await getRequest(`/todo-timers/total-time`, { todoId });
    return {
      todoId: data?.result?.todoId ?? null,
      totalRunningTime: data?.result?.totalRunningTime ?? '00:00:00',
    };
  },

  getInProgressGoals: async (): Promise<InProgressGoal[]> => {
    const data = await getRequest('/goals/todos/in-progress');
    if (!data?.result || !Array.isArray(data.result)) {
      return [];
    }
    return timerMapper.mapApiToInProgressGoals(data.result);
  },
};
