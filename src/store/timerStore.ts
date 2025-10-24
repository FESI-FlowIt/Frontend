'use client';

import { create } from 'zustand';

import { timerApi } from '@/api/timerApi';
import dayjs from '@/lib/dayjs';

const isoKST = () => dayjs().tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
const hmsToSec = (hms?: string | null) => {
  const [h = '0', m = '0', s = '0'] = (hms ?? '00:00:00').split(':');
  return (+h || 0) * 3600 + (+m || 0) * 60 + (+s || 0);
};
const toNum = (v: string | number | null | undefined): number | null => {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string' && /^\d+$/.test(v)) return Number(v);
  return null;
};

type TotalsMap = Record<string, number>;

export type TimerSessionState = {
  sessionId: number | null;
  todoId: number | null;
  isRunning: boolean;
  resumeAtMs: number | null;
  mainStartAtMs: number | null;
  mainBaseSec: number;
  baseTotalSec: number;
  totalsByTodo: TotalsMap;
  startedAt: string | null;
  resumes: string[];
  pauses: string[];
  startInFlight: boolean;
  pauseInFlight: boolean;
  stopInFlight: boolean;
  isStopping: boolean;
  isBlocked: boolean;
  nowMs: number;
};

export type TimerActions = {
  hydrateFromServer: (preferredTodoId?: number | null) => Promise<void>;
  fetchTotalFor: (todoId: number) => Promise<void>;
  setTotalFor: (todoId: number, sec: number) => void;
  getTotalFor: (todoId: number | null) => number;
  refreshTotalSec: (todoId: number) => Promise<void>;
  start: (todoId: number) => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
  ensureRunningAnchors: () => void;
  getSnapshot: () => { baseTotalSec: number; resumeAtMs: number | null };
  startClock: () => void;
  stopClock: () => void;
};

export type TimerStore = TimerSessionState & TimerActions;

let CLOCK_ID: number | null = null;

export const useTimerStore = create<TimerStore>((set, get) => ({
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

  setTotalFor: (todoId, sec) => {
    set(s => ({ totalsByTodo: { ...s.totalsByTodo, [String(todoId)]: Math.max(0, sec) } }));
  },
  getTotalFor: todoId => (todoId ? (get().totalsByTodo[String(todoId)] ?? 0) : 0),
  fetchTotalFor: async todoId => {
    try {
      const total = await timerApi.getTotalRunningTime(todoId);
      get().setTotalFor(todoId, hmsToSec(total?.totalRunningTime));
    } catch {
      // no-op //
    }
  },

  hydrateFromServer: async preferredTodoId => {
    try {
      const status = await timerApi.getCurrentTimerStatus().catch(() => null);
      const runningTodoId = status?.todoId ? toNum(status.todoId) : null;
      const running = Boolean(status?.isRunning);
      const targetTodoId = preferredTodoId ?? runningTodoId ?? null;

      if (targetTodoId) {
        const total = await timerApi.getTotalRunningTime(targetTodoId);
        const serverSec = hmsToSec(total?.totalRunningTime);
        get().setTotalFor(targetTodoId, Math.max(get().getTotalFor(targetTodoId), serverSec));

        const same = running && runningTodoId === targetTodoId;
        if (same) {
          const now = Date.now();
          set({
            isRunning: true,
            sessionId:
              toNum((status as any).sessionId) ?? toNum((status as any).todoTimerId) ?? null,
            todoId: targetTodoId,
            resumeAtMs: get().resumeAtMs ?? now,
            mainStartAtMs: get().mainStartAtMs ?? now,
            mainBaseSec: get().mainBaseSec,
            isBlocked: false,
            nowMs: Date.now(),
          });
        } else {
          set({
            isRunning: false,
            resumeAtMs: null,
            mainStartAtMs: null,
            mainBaseSec: 0,
            isBlocked: Boolean(running && runningTodoId && runningTodoId !== targetTodoId),
          });
        }
      } else {
        set({
          isRunning: false,
          resumeAtMs: null,
          mainStartAtMs: null,
          mainBaseSec: 0,
          isBlocked: false,
        });
      }
    } catch {
      set({
        isRunning: false,
        resumeAtMs: null,
        mainStartAtMs: null,
        mainBaseSec: 0,
        isBlocked: false,
      });
    }
  },

  refreshTotalSec: async todoId => {
    try {
      const total = await timerApi.getTotalRunningTime(todoId);
      const serverSec = hmsToSec(total?.totalRunningTime);
      get().setTotalFor(todoId, Math.max(get().getTotalFor(todoId), serverSec));
    } catch {
      // no-op //
    }
  },

  start: async todoId => {
    const {
      startInFlight,
      isBlocked,
      todoId: curTodoId,
      sessionId,
      mainBaseSec: prevMainBaseSec,
    } = get();
    if (startInFlight) return;
    if (isBlocked && curTodoId !== todoId) return;

    set({ startInFlight: true });
    try {
      const status = await timerApi.getCurrentTimerStatus().catch(() => null);
      const sid = status?.sessionId ? toNum(status.sessionId) : toNum((status as any)?.todoTimerId);
      const stodo = status?.todoId ? toNum(status.todoId) : null;

      let payload: any;
      let isResume = false;
      if (sid && stodo === todoId) {
        payload = await timerApi.resumeTimer(sid);
        isResume = true;
      } else if (sessionId && curTodoId === todoId) {
        payload = await timerApi.resumeTimer(sessionId);
        isResume = true;
      } else {
        payload = await timerApi.startTimer({ todoId });
      }

      await get().refreshTotalSec(todoId);

      const nowIso = isoKST();
      const now = Date.now();
      const hasStartedAt = !!get().startedAt;
      const startedAt = hasStartedAt ? get().startedAt : (payload?.startedDateTime ?? nowIso);

      set({
        isRunning: true,
        sessionId: toNum(payload?.sessionId) ?? toNum((payload as any)?.todoTimerId) ?? null,
        todoId,
        resumeAtMs: get().resumeAtMs ?? now,
        mainStartAtMs: now,
        mainBaseSec: isResume ? prevMainBaseSec : 0,
        startedAt,
        resumes: [...get().resumes, nowIso],
        isBlocked: false,
        nowMs: Date.now(),
      });
    } catch {
      // no-op
    } finally {
      set({ startInFlight: false });
    }
  },

  // pause
  pause: async () => {
    const { pauseInFlight, isStopping, sessionId, todoId, resumeAtMs, mainStartAtMs } = get();
    if (pauseInFlight || isStopping) return;
    if (!sessionId || !todoId) return;

    set({ pauseInFlight: true });
    try {
      await timerApi.pauseTimer(sessionId);

      const runningDelta = resumeAtMs ? Math.floor((Date.now() - resumeAtMs) / 1000) : 0;
      if (runningDelta > 0) {
        get().setTotalFor(todoId, get().getTotalFor(todoId) + runningDelta);
      }
      await get().refreshTotalSec(todoId);

      const mainDelta = mainStartAtMs ? Math.floor((Date.now() - mainStartAtMs) / 1000) : 0;
      set(s => ({
        isRunning: false,
        resumeAtMs: null,
        mainStartAtMs: null,
        mainBaseSec: s.mainBaseSec + Math.max(0, mainDelta),
        pauses: [...s.pauses, isoKST()],
        nowMs: Date.now(),
      }));
    } catch {
      // no-op
    } finally {
      set({ pauseInFlight: false });
    }
  },

  stop: async () => {
    const { stopInFlight, sessionId, todoId, resumes, pauses, startedAt, resumeAtMs } = get();
    if (stopInFlight) return;
    if (!sessionId || !todoId) return;

    set({ stopInFlight: true, isStopping: true });
    try {
      const total = await timerApi.getTotalRunningTime(todoId);
      const serverSec = hmsToSec(total?.totalRunningTime);
      const runningDelta = resumeAtMs ? Math.floor((Date.now() - resumeAtMs) / 1000) : 0;
      const candidate = Math.max(serverSec, get().getTotalFor(todoId) + Math.max(0, runningDelta));
      const finishedAt = isoKST();
      const segs: Array<{ startAt: string; endAt: string }> = [];
      const len = Math.max(resumes.length, pauses.length);
      for (let i = 0; i < len; i++) {
        const startAt = resumes[i];
        const endAt = pauses[i] ?? finishedAt;
        if (startAt) segs.push({ startAt, endAt });
      }

      await timerApi.finishTimer(sessionId, {
        todoId,
        totalSec: candidate,
        finishedAt,
        startedAt: startedAt ?? undefined,
        resumes,
        pauses,
        segments: segs,
      });

      get().setTotalFor(todoId, candidate);

      set({
        isRunning: false,
        resumeAtMs: null,
        mainStartAtMs: null,
        mainBaseSec: 0,
        sessionId: null,
        startedAt: null,
        resumes: [],
        pauses: [],
        isStopping: false,
        stopInFlight: false,
        nowMs: Date.now(),
      });
    } catch {
      set({ isStopping: false, stopInFlight: false });
    }
  },

  ensureRunningAnchors: () => {
    const { isRunning, resumeAtMs, mainStartAtMs } = get();
    if (isRunning && (!resumeAtMs || !mainStartAtMs)) {
      const now = Date.now();
      set({
        resumeAtMs: resumeAtMs ?? now,
        mainStartAtMs: mainStartAtMs ?? now,
        nowMs: Date.now(),
      });
    }
  },

  getSnapshot: () => ({ baseTotalSec: get().baseTotalSec, resumeAtMs: get().resumeAtMs }),

  startClock: () => {
    if (CLOCK_ID != null) return;
    set({ nowMs: Date.now() });
    CLOCK_ID = window.setInterval(() => set({ nowMs: Date.now() }), 1000);
  },
  stopClock: () => {
    if (CLOCK_ID != null) {
      clearInterval(CLOCK_ID);
      CLOCK_ID = null;
    }
  },
}));

declare global {
  interface Window {
    __timerClockStarted?: boolean;
  }
}

if (typeof window !== 'undefined') {
  if (!window.__timerClockStarted) {
    window.__timerClockStarted = true;
    window.setTimeout(() => {
      try {
        useTimerStore.getState().startClock();
      } catch {
        // no-op //
      }
    }, 0);
  }
}
