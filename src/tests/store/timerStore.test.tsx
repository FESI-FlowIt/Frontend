// __tests__/store/timerStore.test.tsx
import { act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTimerStore } from '@/store/timerStore';

// ---- timerApi 모킹 -------------------------------------------------
const getCurrentTimerStatus = jest.fn();
const getTotalRunningTime = jest.fn();
const startTimer = jest.fn();
const resumeTimer = jest.fn();
const pauseTimer = jest.fn();
const finishTimer = jest.fn();

jest.mock('@/api/timerApi', () => ({
  timerApi: {
    getCurrentTimerStatus: (...args: any[]) => getCurrentTimerStatus(...args),
    getTotalRunningTime: (...args: any[]) => getTotalRunningTime(...args),
    startTimer: (...args: any[]) => startTimer(...args),
    resumeTimer: (...args: any[]) => resumeTimer(...args),
    pauseTimer: (...args: any[]) => pauseTimer(...args),
    finishTimer: (...args: any[]) => finishTimer(...args),
  },
}));

describe('timerStore', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // 스토어 초기화
    act(() => {
      useTimerStore.setState({
        sessionId: null,
        todoId: null,
        isRunning: false,
        resumeAtMs: null,
        mainStartAtMs: null,
        mainBaseSec: 0,
        baseTotalSec: 0,
        totalsByTodo: {},
        startedAt: null,
        resumes: [],
        pauses: [],
        startInFlight: false,
        pauseInFlight: false,
        stopInFlight: false,
        isStopping: false,
        isBlocked: false,
        nowMs: Date.now(),
      } as any);
    });
  });

  test('pause() 후 hydrateFromServer(): isRunning=false, 앵커(null), mainBaseSec 증가', async () => {
    // running 상태 구성
    const now = Date.now();
    act(() => {
      useTimerStore.setState({
        sessionId: 101,
        todoId: 1,
        isRunning: true,
        resumeAtMs: now - 3000, // 3초 달림
        mainStartAtMs: now - 3000,
        mainBaseSec: 5, // 기존 5초
        resumes: [],
        pauses: [],
        pauseInFlight: false,
        isStopping: false,
      } as any);
    });

    pauseTimer.mockResolvedValueOnce(undefined);
    // 서버는 멈춘 상태라고 응답
    getCurrentTimerStatus.mockResolvedValueOnce({ isRunning: false });
    // 총합은 0으로 가정(우린 로컬에서 누적)
    getTotalRunningTime.mockResolvedValue({ totalRunningTime: '00:00:00' });

    // pause
    await act(async () => {
      await useTimerStore.getState().pause();
    });

    // pause 직후: isRunning=false, 앵커 null, mainBaseSec >= 5+3
    const afterPause = useTimerStore.getState();
    expect(afterPause.isRunning).toBe(false);
    expect(afterPause.resumeAtMs).toBeNull();
    expect(afterPause.mainStartAtMs).toBeNull();
    expect(afterPause.mainBaseSec).toBeGreaterThanOrEqual(8);

    // hydrateFromServer: 서버도 isRunning=false → 그대로 멈춘 상태 유지
    await act(async () => {
      await useTimerStore.getState().hydrateFromServer(null);
    });
    const afterHydrate = useTimerStore.getState();
    expect(afterHydrate.isRunning).toBe(false);
    expect(afterHydrate.resumeAtMs).toBeNull();
    expect(afterHydrate.mainStartAtMs).toBeNull();
  });

  test('stop() 후 hydrateFromServer(): 완전 리셋 (sessionId, resumes/pauses 초기화)', async () => {
    const now = Date.now();
    act(() => {
      useTimerStore.setState({
        sessionId: 202,
        todoId: 1,
        isRunning: true,
        resumeAtMs: now - 2000,
        mainStartAtMs: now - 2000,
        mainBaseSec: 10,
        startedAt: '2025-01-01T00:00:00+09:00',
        resumes: ['2025-01-01T00:00:00+09:00'],
        pauses: [],
      } as any);
    });

    getTotalRunningTime.mockResolvedValue({ totalRunningTime: '00:00:12' });
    finishTimer.mockResolvedValueOnce(undefined);
    // 새로고침 시 서버는 멈춤 상태라고 응답
    getCurrentTimerStatus.mockResolvedValueOnce({ isRunning: false });

    await act(async () => {
      await useTimerStore.getState().stop();
    });

    const afterStop = useTimerStore.getState();
    expect(afterStop.isRunning).toBe(false);
    expect(afterStop.sessionId).toBeNull();
    expect(afterStop.resumeAtMs).toBeNull();
    expect(afterStop.mainStartAtMs).toBeNull();
    expect(afterStop.mainBaseSec).toBe(0);
    expect(afterStop.resumes).toHaveLength(0);
    expect(afterStop.pauses).toHaveLength(0);

    await act(async () => {
      await useTimerStore.getState().hydrateFromServer(null);
    });
    const afterHydrate = useTimerStore.getState();
    expect(afterHydrate.isRunning).toBe(false);
    expect(afterHydrate.sessionId).toBeNull();
  });

  test('ensureRunningAnchors(): isRunning=false면 앵커를 채우지 않는다', () => {
    act(() => {
      useTimerStore.setState({
        isRunning: false,
        resumeAtMs: null,
        mainStartAtMs: null,
      } as any);
    });

    act(() => {
      useTimerStore.getState().ensureRunningAnchors();
    });

    const s = useTimerStore.getState();
    expect(s.resumeAtMs).toBeNull();
    expect(s.mainStartAtMs).toBeNull();
  });

  test('ensureRunningAnchors(): isRunning=true + 앵커 누락 → 현재 시각으로 채움', () => {
    act(() => {
      useTimerStore.setState({
        isRunning: true,
        resumeAtMs: null,
        mainStartAtMs: null,
      } as any);
    });

    act(() => {
      useTimerStore.getState().ensureRunningAnchors();
    });

    const s = useTimerStore.getState();
    expect(typeof s.resumeAtMs).toBe('number');
    expect(typeof s.mainStartAtMs).toBe('number');
  });
});
