import {
  ApiStartTimerRequest,
  ApiStartTimerResponse,
  ApiPauseTimerResponse,
  ApiResumeTimerResponse,
  ApiFinishTimerResponse,
  ApiGetCurrentTimerStatusResponse,
  ApiTotalRunningTimeResponse,
  InProgressGoal,
  TimerSession,
} from '@/interfaces/timer';

import { getRequest, postRequest, patchRequest } from '@/api';
import { timerMapper } from '@/api/mapper/timerMapper';

export const timerApi = {
startTimer: async (body: ApiStartTimerRequest) => {
  const data = await postRequest('/todo-timers', body);

  console.log('🧪 타이머 시작 응답:', data);
  console.log('🧪 응답 result:', data.result);

  const validCodes = ['0000', '0201'];
  if (!validCodes.includes(data?.code)) {
    throw new Error(`타이머 시작 실패: ${data?.message ?? '알 수 없는 오류'}`);
  }

  // ✅ result가 객체일 경우 처리
  const result = data.result;
  if (!result || typeof result !== 'object' || !result.todoTimerId) {
    throw new Error('Invalid response: todoTimerId is missing');
  }

  return timerMapper.mapApiToStartedTimer(result);
},




  pauseTimer: async (todoTimerId: number) => {
    const data: ApiPauseTimerResponse = await postRequest(
      `/todo-timers/${todoTimerId}/pause`,
      {}
    );
    return timerMapper.mapApiToPausedTimer(data);
  },

  resumeTimer: async (todoTimerId: number) => {
    const data: ApiResumeTimerResponse = await patchRequest(
      `/todo-timers/${todoTimerId}/resume`
    );
    return timerMapper.mapApiToResumedTimer(data);
  },

  finishTimer: async (todoTimerId: number) => {
    const data: ApiFinishTimerResponse = await patchRequest(
      `/todo-timers/${todoTimerId}/finish`
    );
    return timerMapper.mapApiToFinishedTimer(data);
  },

  getCurrentTimerStatus: async (): Promise<TimerSession | null> => {
    const res: ApiGetCurrentTimerStatusResponse = await getRequest('/todo-timers/user');
    return timerMapper.mapApiToCurrentTimerStatus(res);
  },

  getTotalRunningTime: async (todoId: number) => {
    const data: ApiTotalRunningTimeResponse = await getRequest('/todo-timers/total-time', {
      todoId,
    });
    return timerMapper.mapApiToTotalRunningTime(data);
  },

  getInProgressGoals: async (): Promise<InProgressGoal[]> => {
    const data = await getRequest('/goals/todos/in-progress');
    console.log('🚨 응답 data:', data);

    if (!data?.result || !Array.isArray(data.result)) {
      console.warn('⚠️ 진행 중인 목표 없음 또는 잘못된 형식:', data);
      return [];
    }

    return timerMapper.mapApiToInProgressGoals(data.result);
  },
};
