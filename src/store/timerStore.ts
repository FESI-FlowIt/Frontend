'use client';

import { create } from 'zustand';
import { timerApi } from '@/api/timerApi';
import dayjs from '@/lib/dayjs';

const isoUTC = () => dayjs().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'); // ✅ 항상 UTC
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

type ApiTimerStatus = {
  isRunning?: boolean | null;
  todoId?: string | number | null;
  sessionId?: string | number | null;
  todoTimerId?: string | number | null;
  startedDateTime?: string | null;
};

export type TimerSessionState = {
  sessionId: number | null;
  todoId: number | null;
  lastTodoId: number | null;

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

/* sessionStorage (일시정지 복원 전용) */
const PAUSE_TODO = 'tp_todo';
const PAUSE_BASESEC = 'tp_base';
const PAUSE_TOTALSEC = 'tp_total';
const ssSet = (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch {} };
const ssGet = (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } };
const ssDel = (k: string) => { try { sessionStorage.removeItem(k); } catch {} };
const markPaused = (todoId: number, baseSec: number, totalSec: number) => {
  ssSet(PAUSE_TODO, String(todoId));
  ssSet(PAUSE_BASESEC, String(Math.max(0, baseSec)));
  ssSet(PAUSE_TOTALSEC, String(Math.max(0, totalSec)));
};
const clearPaused = () => { ssDel(PAUSE_TODO); ssDel(PAUSE_BASESEC); ssDel(PAUSE_TOTALSEC); };
const readPaused = () => {
  const t = ssGet(PAUSE_TODO);
  const b = ssGet(PAUSE_BASESEC);
  const tot = ssGet(PAUSE_TOTALSEC);
  const todoId = t && /^\d+$/.test(t) ? Number(t) : null;
  const base = b && /^\d+$/.test(b) ? Number(b) : null;
  const total = tot && /^\d+$/.test(tot) ? Number(tot) : null;
  return { todoId, base, total };
};

/* 히트맵 갱신은 정지시에만 */
const emitHeatmapRefresh = (detail: any) => {
  try { window.dispatchEvent(new CustomEvent('heatmap:refresh', { detail })); } catch {}
};

export const useTimerStore = create<TimerStore>((set, get) => ({
  sessionId: null,
  todoId: null,
  lastTodoId: null,

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
      const [total, paused] = await Promise.all([
        timerApi.getTotalRunningTime(todoId).catch(() => null),
        (async () => readPaused())(),
      ]);
      const server = hmsToSec(total?.totalRunningTime);
      const existing = get().getTotalFor(todoId);
      const pausedTotal = paused.todoId === todoId && paused.total != null ? paused.total : 0;
      get().setTotalFor(todoId, Math.max(server, existing, pausedTotal));
    } catch {}
  },

  hydrateFromServer: async preferredTodoId => {
    // 일시정지 즉시 복원
    const paused = readPaused();
    if (paused.todoId && paused.base != null) {
      const tId = paused.todoId!;
      const existing = get().getTotalFor(tId);
      const robust = Math.max(existing, paused.total ?? 0);
      if (robust > existing) get().setTotalFor(tId, robust);
      set({
        isRunning: false,
        sessionId: get().sessionId,
        todoId: tId,
        lastTodoId: tId,
        resumeAtMs: null,
        mainStartAtMs: null,
        mainBaseSec: Math.max(0, paused.base!),
        isBlocked: false,
        nowMs: Date.now(),
      });
    }

    try {
      const status = (await timerApi.getCurrentTimerStatus().catch(() => null)) as ApiTimerStatus | null;
      const serverRunningTodo = status?.todoId != null ? toNum(status.todoId) : null;
      const serverRunning = Boolean(status?.isRunning);

      const targetTodoId =
        preferredTodoId ?? (paused.todoId ?? null) ?? serverRunningTodo ?? get().lastTodoId ?? get().todoId ?? null;

      if (targetTodoId) {
        const total = await timerApi.getTotalRunningTime(targetTodoId).catch(() => null);
        const serverTotalSec = hmsToSec(total?.totalRunningTime);

        const existing = get().getTotalFor(targetTodoId);
        const pausedTotal = paused.todoId === targetTodoId && paused.total != null ? paused.total : 0;
        get().setTotalFor(targetTodoId, Math.max(serverTotalSec, existing, pausedTotal));

        const sameRunning = serverRunning && serverRunningTodo === targetTodoId;
        const forcePaused = paused.todoId === targetTodoId && paused.base != null;

        if (sameRunning && !forcePaused) {
          const now = Date.now();
          set({
            isRunning: true,
            sessionId: toNum(status?.sessionId) ?? toNum(status?.todoTimerId) ?? null,
            todoId: targetTodoId,
            lastTodoId: targetTodoId,
            resumeAtMs: get().resumeAtMs ?? now,
            mainStartAtMs: get().mainStartAtMs ?? now,
            mainBaseSec: get().mainBaseSec,
            isBlocked: false,
            nowMs: Date.now(),
          });
        } else {
          const base = forcePaused ? paused.base! : get().mainBaseSec;
          set({
            isRunning: false,
            sessionId: toNum(status?.sessionId) ?? toNum(status?.todoTimerId) ?? null,
            todoId: targetTodoId,
            lastTodoId: targetTodoId,
            resumeAtMs: null,
            mainStartAtMs: null,
            mainBaseSec: Math.max(0, base),
            isBlocked: Boolean(serverRunning && serverRunningTodo && serverRunningTodo !== targetTodoId),
            nowMs: Date.now(),
          });
        }
      } else {
        set({
          isRunning: false,
          sessionId: null,
          todoId: null,
          lastTodoId: null,
          resumeAtMs: null,
          mainStartAtMs: null,
          mainBaseSec: 0,
          isBlocked: false,
          nowMs: Date.now(),
        });
      }
    } catch {
      set({
        isRunning: false,
        sessionId: null,
        todoId: null,
        lastTodoId: null,
        resumeAtMs: null,
        mainStartAtMs: null,
        mainBaseSec: 0,
        isBlocked: false,
        nowMs: Date.now(),
      });
    }
  },

  refreshTotalSec: async todoId => {
    try {
      const [total, paused] = await Promise.all([
        timerApi.getTotalRunningTime(todoId).catch(() => null),
        (async () => readPaused())(),
      ]);
      const serverSec = hmsToSec(total?.totalRunningTime);
      const existing = get().getTotalFor(todoId);
      const pausedTotal = paused.todoId === todoId && paused.total != null ? paused.total : 0;
      get().setTotalFor(todoId, Math.max(serverSec, existing, pausedTotal));
    } catch {}
  },

  start: async todoId => {
    const { startInFlight, isBlocked, todoId: curTodoId, sessionId, mainBaseSec: prevBase } = get();
    if (startInFlight) return;
    if (isBlocked && curTodoId !== todoId) return;

    set({ startInFlight: true });
    try {
      const status = (await timerApi.getCurrentTimerStatus().catch(() => null)) as ApiTimerStatus | null;
      const sid = status?.sessionId ? toNum(status.sessionId) : toNum(status?.todoTimerId);
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

      clearPaused();
      await get().refreshTotalSec(todoId);

      const nowIso = isoUTC(); // ✅ UTC
      const now = Date.now();
      const hasStartedAt = !!get().startedAt;
      const startedAt = hasStartedAt ? get().startedAt : (payload?.startedDateTime ?? nowIso);

      set({
        isRunning: true,
        sessionId: toNum(payload?.sessionId) ?? toNum((payload as any)?.todoTimerId) ?? null,
        todoId,
        lastTodoId: todoId,
        resumeAtMs: get().resumeAtMs ?? now,
        mainStartAtMs: now,
        mainBaseSec: isResume ? prevBase : 0,
        startedAt,                        // ✅ UTC 문자열
        resumes: [...get().resumes, nowIso],
        isBlocked: false,
        nowMs: Date.now(),
      });
    } catch {} finally {
      set({ startInFlight: false });
    }
  },

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
      const serverTotalAfter = get().getTotalFor(todoId);

      const mainDelta = mainStartAtMs ? Math.floor((Date.now() - mainStartAtMs) / 1000) : 0;
      const pausedBase = Math.max(0, get().mainBaseSec + Math.max(0, mainDelta));

      markPaused(todoId, pausedBase, serverTotalAfter);

      set(s => ({
        isRunning: false,
        todoId,
        lastTodoId: todoId,
        resumeAtMs: null,
        mainStartAtMs: null,
        mainBaseSec: pausedBase,
        pauses: [...s.pauses, isoUTC()],   // ✅ UTC
        nowMs: Date.now(),
      }));
    } catch {} finally {
      set({ pauseInFlight: false });
    }
  },

  stop: async () => {
    const { stopInFlight, sessionId, todoId, resumes, pauses, startedAt, resumeAtMs, isRunning } = get();
    if (stopInFlight) return;
    if (!sessionId || !todoId) return;

    set({ stopInFlight: true, isStopping: true });
    try {
      let candidate: number;

      if (!isRunning) {
        const { todoId: pTodo, total: pTotal } = readPaused();
        const localTotal = (pTodo === todoId && pTotal != null) ? pTotal : get().getTotalFor(todoId);
        candidate = Math.max(0, localTotal);
      } else {
        const total = await timerApi.getTotalRunningTime(todoId);
        const serverSec = hmsToSec(total?.totalRunningTime);
        const runningDelta = resumeAtMs ? Math.floor((Date.now() - resumeAtMs) / 1000) : 0;
        candidate = Math.max(serverSec, get().getTotalFor(todoId) + Math.max(0, runningDelta));
      }

      const finishedAt = isoUTC(); // ✅ UTC
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
        finishedAt,            // ✅ UTC로 전송
        startedAt: startedAt ?? undefined, // 이미 UTC로 저장됨
        resumes,
        pauses,
        segments: segs,
      });

      get().setTotalFor(todoId, candidate);

      emitHeatmapRefresh({
        cause: 'stop',
        todoId,
        date: finishedAt,   // UTC
        totalSec: candidate,
      });

      clearPaused();

      set({
        isRunning: false,
        resumeAtMs: null,
        mainStartAtMs: null,
        mainBaseSec: 0,
        sessionId: null,
        startedAt: null,
        resumes: [],
        pauses: [],
        todoId: null,
        lastTodoId: null,
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
      set({ resumeAtMs: resumeAtMs ?? now, mainStartAtMs: mainStartAtMs ?? now, nowMs: Date.now() });
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

declare global { interface Window { __timerClockStarted?: boolean; } }

if (typeof window !== 'undefined') {
  if (!window.__timerClockStarted) {
    window.__timerClockStarted = true;
    window.setTimeout(() => {
      try { useTimerStore.getState().startClock(); } catch {}
    }, 0);
  }
}
