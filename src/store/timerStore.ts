// // src/store/timerStore.ts
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface TimerState {
//   isRunning: boolean;
//   minutes: number;
//   seconds: number;
//   accumulatedSeconds: number;
// }

// interface TimerStore {
//   timers: Record<string, TimerState>;
//   runningTodoId: string | null;

//   getTimerState: (todoId: string) => TimerState;
//   startTimer: (todoId: string) => void;
//   pauseTimer: (todoId: string) => void;
//   stopTimer: (todoId: string) => void;
//   isAnyRunning: boolean;

//   initTick: () => void;
// }

// export const useTimerStore = create<TimerStore>()(
//   persist(
//     (set, get) => {
//       let intervalId: ReturnType<typeof setInterval> | null = null;

//       const ensureTicking = () => {
//         if (intervalId) return;
//         intervalId = setInterval(() => {
//           const state = get();
//           const runningId = state.runningTodoId;
//           if (!runningId) return;

//           const timers = state.timers;
//           const t = timers[runningId];
//           if (!t || !t.isRunning) return;

//           let newMinutes = t.minutes;
//           let newSeconds = t.seconds + 1;
//           if (newSeconds >= 60) {
//             newMinutes += 1;
//             newSeconds = 0;
//           }

//           set({
//             timers: {
//               ...timers,
//               [runningId]: {
//                 ...t,
//                 minutes: newMinutes,
//                 seconds: newSeconds,
//               },
//             },
//           });
//         }, 1000);
//       };

//       const clearTicking = () => {
//         if (intervalId) {
//           clearInterval(intervalId);
//           intervalId = null;
//         }
//       };

//       const initializeTimer = (todoId: string) => {
//         const timers = get().timers;
//         if (!timers[todoId]) {
//           set(state => ({
//             timers: {
//               ...state.timers,
//               [todoId]: {
//                 isRunning: false,
//                 minutes: 0,
//                 seconds: 0,
//                 accumulatedSeconds: 0,
//               },
//             },
//           }));
//         }
//       };

//       return {
//         timers: {},
//         runningTodoId: null,

//         getTimerState: (todoId: string) => {
//           const timers = get().timers;
//           return (
//             timers[todoId] || {
//               isRunning: false,
//               minutes: 0,
//               seconds: 0,
//               accumulatedSeconds: 0,
//             }
//           );
//         },

//         startTimer: (todoId: string) => {
//           const { runningTodoId } = get();
//           if (runningTodoId && runningTodoId !== todoId) return;

//           initializeTimer(todoId);
//           set(state => {
//             const t = state.timers[todoId];
//             return {
//               timers: {
//                 ...state.timers,
//                 [todoId]: { ...t, isRunning: true },
//               },
//               runningTodoId: todoId,
//             };
//           });

//           ensureTicking();
//         },

//         pauseTimer: (todoId: string) => {
//           set(state => {
//             const t = state.timers[todoId];
//             return {
//               timers: {
//                 ...state.timers,
//                 [todoId]: { ...t, isRunning: false },
//               },
//               runningTodoId: null,
//             };
//           });
//           clearTicking();
//         },

//         stopTimer: (todoId: string) => {
//           set(state => {
//             const t = state.timers[todoId];
//             const elapsed = t.minutes * 60 + t.seconds;
//             return {
//               timers: {
//                 ...state.timers,
//                 [todoId]: {
//                   isRunning: false,
//                   minutes: 0,
//                   seconds: 0,
//                   accumulatedSeconds: t.accumulatedSeconds + elapsed,
//                 },
//               },
//               runningTodoId: null,
//             };
//           });
//           clearTicking();
//         },

//         isAnyRunning: false,

//         initTick: () => {
//           const { runningTodoId, timers } = get();
//           if (runningTodoId && timers[runningTodoId]?.isRunning) {
//             // 저장된 상태가 "실행 중"이면 틱을 다시 켜줌
//             ensureTicking();
//           }
//         },
//       };
//     },
//     {
//       name: 'timer-store', // localStorage key
//       partialize: state => ({
//         timers: state.timers,
//         runningTodoId: state.runningTodoId,
//       }),
//     }
//   )
// );
