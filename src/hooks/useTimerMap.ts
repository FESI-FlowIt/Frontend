import { useEffect, useRef, useState } from 'react';

interface TimerState {
  isRunning: boolean;
  minutes: number;
  seconds: number;
  accumulatedSeconds: number;
}

type TimerMap = Record<string, TimerState>;

export function useTimerMap() {
  const [timers, setTimers] = useState<TimerMap>({});
  const intervalsRef = useRef<Record<string, ReturnType<typeof setInterval> | undefined>>({});

  // 특정 todoId에 대한 타이머 상태 반환 (없으면 초기값)
  const getTimerState = (todoId: string): TimerState => {
    return (
      timers[todoId] || {
        isRunning: false,
        minutes: 0,
        seconds: 0,
        accumulatedSeconds: 0,
      }
    );
  };

  // 타이머 상태를 업데이트
  const updateTimerState = (todoId: string, newState: Partial<TimerState>) => {
    setTimers(prev => ({
      ...prev,
      [todoId]: {
        ...getTimerState(todoId),
        ...newState,
      },
    }));
  };

  // 타이머 시작 (다른 타이머가 실행 중이면 무시)
  const handleStart = (todoId: string) => {
    const runningId = Object.entries(timers).find(([, state]) => state.isRunning)?.[0];
    if (runningId && runningId !== todoId) return;

    updateTimerState(todoId, { isRunning: true });

    const interval = setInterval(() => {
      setTimers(prev => {
        const current = prev[todoId];
        if (!current) return prev;

        let { minutes, seconds } = current;
        seconds += 1;
        if (seconds >= 60) {
          minutes += 1;
          seconds = 0;
        }

        return {
          ...prev,
          [todoId]: {
            ...current,
            minutes,
            seconds,
          },
        };
      });
    }, 1000);

    intervalsRef.current[todoId] = interval;
  };

  // 타이머 일시정지
  const handlePause = (todoId: string) => {
    const interval = intervalsRef.current[todoId];
    if (interval) {
      clearInterval(interval);
      intervalsRef.current[todoId] = undefined;
    }

    updateTimerState(todoId, { isRunning: false });
  };

  // 타이머 정지 및 누적 시간 저장
  const handleStop = (todoId: string) => {
    const { minutes, seconds, accumulatedSeconds } = getTimerState(todoId);
    const currentElapsed = minutes * 60 + seconds;

    const interval = intervalsRef.current[todoId];
    if (interval) {
      clearInterval(interval);
      intervalsRef.current[todoId] = undefined;
    }

    updateTimerState(todoId, {
      isRunning: false,
      minutes: 0,
      seconds: 0,
      accumulatedSeconds: accumulatedSeconds + currentElapsed,
    });
  };

  // 실행 중인 타이머 여부 및 해당 todoId
  const isAnyRunning = Object.values(timers).some(state => state.isRunning);
  const runningTodoId = Object.entries(timers).find(([, state]) => state.isRunning)?.[0] || null;

  // 컴포넌트 unmount 시 모든 interval 정리
  useEffect(() => {
    const allIntervals = intervalsRef.current;
    return () => {
      Object.values(allIntervals).forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  return {
    getTimerState,
    handleStart,
    handlePause,
    handleStop,
    isAnyRunning,
    runningTodoId,
  };
}
