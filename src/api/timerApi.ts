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
import { useAuthStore } from '@/store/authStore'; // ⬅ 추가

export const timerApi = {
  startTimer: async (body: ApiStartTimerRequest): Promise<TimerSession> => {
    const data = await postRequest('/todo-timers', body);

    console.log('🧪 타이머 시작 응답:', data);
    console.log('🧪 응답 result:', data?.result);

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
    console.log('🟠 일시정지 응답 data:', data);
    return timerMapper.mapApiToPausedTimer(data);
  },

  //  언로드 직전 best-effort 일시정지(응답 기다리지 않음)
  pauseTimerKeepalive(todoTimerId: number) {
    try {
      const token = useAuthStore.getState().accessToken ?? '';
      const base = process.env.NEXT_PUBLIC_API_BASE ?? ''; // 없으면 상대경로 사용
      const url = `${base}/todo-timers/${todoTimerId}/pause`;

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({}),
        keepalive: true, //  언로드 중에도 전송 시도
        cache: 'no-store',
      }).catch(() => {
        /* 언로드 중 실패는 무시 */
      });
    } catch {
      /* noop */
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
    console.log('🛑 finishTimer 응답:', data);

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
    console.log('🔍 total-time raw:', data);

    return {
      todoId: data?.result?.todoId ?? null,
      totalRunningTime: data?.result?.totalRunningTime ?? '00:00:00',
    };
  },

  getInProgressGoals: async (): Promise<InProgressGoal[]> => {
    const data = await getRequest('/goals/todos/in-progress');
    console.log('🚨 진행중 목표 응답 data:', data);

    if (!data?.result || !Array.isArray(data.result)) {
      console.warn('⚠️ 진행 중인 목표 없음 또는 잘못된 형식:', data);
      return [];
    }
    return timerMapper.mapApiToInProgressGoals(data.result);
  },
};
