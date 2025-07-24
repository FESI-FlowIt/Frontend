import { create } from 'zustand';

interface TimerState {
  isRunning: boolean;
  minutes: number;
  seconds: number;
  accumulatedSeconds: number;
}

interface TimerStore {
  timers: Record<string, TimerState>;
  runningTodoId: string | null;

  getTimerState: (todoId: string) => TimerState;
  startTimer: (todoId: string) => void;
  pauseTimer: (todoId: string) => void;
  stopTimer: (todoId: string) => void;
  isAnyRunning: boolean;
}

export const useTimerStore = create<TimerStore>((set, get) => {
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const initializeTimer = (todoId: string) => {
  const timers = get().timers;
  if (!timers[todoId]) {
    set(state => ({
      timers: {
        ...state.timers,
        [todoId]: {
          isRunning: false,
          minutes: 0,
          seconds: 0,
          accumulatedSeconds: 0,
        },
      },
    }));
  }
};


  return {
    timers: {},
    runningTodoId: null,

    getTimerState: (todoId: string) => {
      const timers = get().timers;
      return (
        timers[todoId] || {
          isRunning: false,
          minutes: 0,
          seconds: 0,
          accumulatedSeconds: 0,
        }
      );
    },

    startTimer: (todoId: string) => {
      if (get().runningTodoId && get().runningTodoId !== todoId) return;

      initializeTimer(todoId);
      set(state => {
        const updated = {
          ...state.timers[todoId],
          isRunning: true,
        };
        return {
          timers: {
            ...state.timers,
            [todoId]: updated,
          },
          runningTodoId: todoId,
        };
      });

      if (!intervalId) {
        intervalId = setInterval(() => {
          set(state => {
            const timer = state.timers[todoId];
            let newMinutes = timer.minutes;
            let newSeconds = timer.seconds + 1;

            if (newSeconds >= 60) {
              newMinutes += 1;
              newSeconds = 0;
            }

            return {
              timers: {
                ...state.timers,
                [todoId]: {
                  ...timer,
                  minutes: newMinutes,
                  seconds: newSeconds,
                },
              },
            };
          });
        }, 1000);
      }
    },

    pauseTimer: (todoId: string) => {
      set(state => {
        const timer = state.timers[todoId];
        return {
          timers: {
            ...state.timers,
            [todoId]: {
              ...timer,
              isRunning: false,
            },
          },
          runningTodoId: null,
        };
      });

      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },

    stopTimer: (todoId: string) => {
      set(state => {
        const timer = state.timers[todoId];
        const elapsed = timer.minutes * 60 + timer.seconds;
        return {
          timers: {
            ...state.timers,
            [todoId]: {
              isRunning: false,
              minutes: 0,
              seconds: 0,
              accumulatedSeconds: timer.accumulatedSeconds + elapsed,
            },
          },
          runningTodoId: null,
        };
      });

      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },

    isAnyRunning: false,
  };
});
