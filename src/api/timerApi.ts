import { getRequest, patchRequest, postRequest } from '@/api';
import { timerMapper } from '@/api/mapper/timerMapper';
import {
  ApiFinishTimerResponse,
  ApiGetCurrentTimerStatusResponse,
  ApiPauseTimerResponse,
  ApiResumeTimerResponse,
  ApiStartTimerRequest,
  ApiStartTimerResponse,
  InProgressGoal,
  TimerSession,
} from '@/interfaces/timer';
import { useAuthStore } from '@/store/authStore';

export const timerApi = {
  startTimer: async (body: ApiStartTimerRequest): Promise<TimerSession> => {
    const data = await postRequest('/todo-timers', body);

    const validCodes = ['0000', '0201'];
    if (!validCodes.includes(data?.code)) {
      throw new Error(`타이머 시작 실패: ${data?.message ?? '알 수 없는 오류'}`);
    }

    const result: ApiStartTimerResponse | undefined = data?.result;
    if (!result || typeof result !== 'object' || !result.todoTimerId) {
      throw new Error('Invalid response: todoTimerId is missing');
    }

    return timerMapper.mapApiToStartedTimer(result);
  },

  pauseTimer: async (todoTimerId: number): Promise<TimerSession> => {
    const data: ApiPauseTimerResponse = await postRequest(`/todo-timers/${todoTimerId}/pause`, {});
    return timerMapper.mapApiToPausedTimer(data);
  },

pauseTimerKeepalive(todoTimerId: number) {
  try {
    const token = useAuthStore.getState().accessToken ?? '';
    const base = process.env.NEXT_PUBLIC_API_BASE ?? '';
    const url = `${base}/todo-timers/${todoTimerId}/pause`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({}),
      keepalive: true,
      cache: 'no-store',
    }).catch(() => {});
  } catch {
    // intentionally empty
  }
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

  finishTimer: async (todoTimerId: number) => {
    const data: any = await patchRequest(`/todo-timers/${todoTimerId}/finish`);
    if (data?.code && data.code !== '0000') {
      throw new Error(data.message || '타이머 종료 실패');
    }
    const payload: ApiFinishTimerResponse = data?.result ? data.result : data;
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
