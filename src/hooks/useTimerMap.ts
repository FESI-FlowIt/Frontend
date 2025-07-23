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

  const updateTimerState = (todoId: string, newState: Partial<TimerState>) => {
    setTimers(prev => ({
      ...prev,
      [todoId]: {
        ...getTimerState(todoId),
        ...newState,
      },
    }));
  };

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

  const handlePause = (todoId: string) => {
    const interval = intervalsRef.current[todoId];
    if (interval) {
      clearInterval(interval);
      intervalsRef.current[todoId] = undefined;
    }

    updateTimerState(todoId, { isRunning: false });
  };

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

  const isAnyRunning = Object.values(timers).some(state => state.isRunning);
  const runningTodoId = Object.entries(timers).find(([, state]) => state.isRunning)?.[0] || null;

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
