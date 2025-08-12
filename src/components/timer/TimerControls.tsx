'use client';
/* eslint-disable simple-import-sort/imports */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { timerApi } from '@/api/timerApi';
import dayjs from '@/lib/dayjs'; // tz 기본 Asia/Seoul 세팅 파일

interface TimerControlsProps {
  todoId: number | null;
  onSyncTodoId: (_todoId: number) => void;
  isRunning: boolean;
  isBlocked: boolean;
  onStart: () => void;
  onPause: (finalTotalSec?: number) => void;
  onStop: (finalTotalSec?: number) => void;
  setIsRunning: (running: boolean) => void;
}

const CLOUDFRONT_URL = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_IMAGE_URL}`;

/** "YYYY-MM-DDTHH:mm:ss.SSS+09:00" (KST ISO) */
const isoKST = () => dayjs().tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm:ss.SSSZ');

/** "HH:MM:SS" → 초 */
const hmsToSec = (hms?: string) => {
  const [h = '0', m = '0', s = '0'] = (hms ?? '00:00:00').split(':');
  return (+h || 0) * 3600 + (+m || 0) * 60 + (+s || 0);
};

/** ---------- 안전 파서 ---------- */
const asObj = (x: unknown): Record<string, unknown> | null =>
  x && typeof x === 'object' ? (x as Record<string, unknown>) : null;

const chain = (x: unknown) => {
  const root = asObj(x);
  const res = root?.result ? asObj(root.result) : null;
  return [root, res].filter(Boolean) as Array<Record<string, unknown>>;
};

const numish = (v: unknown): number | null => {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string' && /^\d+$/.test(v.trim())) return Number(v);
  return null;
};

const boolish = (v: unknown): boolean | null => {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'number') return v === 1 ? true : v === 0 ? false : null;
  if (typeof v === 'string') {
    const t = v.trim().toLowerCase();
    if (t === 'true' || t === '1') return true;
    if (t === 'false' || t === '0') return false;
  }
  return null;
};

const pickId = (x: unknown): number | null => {
  for (const c of chain(x)) {
    for (const k of ['todoTimerId', 'sessionId', 'id']) {
      const n = numish(c[k]);
      if (n != null) return n;
    }
  }
  return null;
};

const pickTodoId = (x: unknown): number | null => {
  for (const c of chain(x)) {
    const n = numish(c['todoId']);
    if (n != null) return n;
  }
  return null;
};

const pickIsRunning = (x: unknown): boolean => {
  for (const c of chain(x)) {
    const b = boolish(c['isRunning']);
    if (b != null) return b;
  }
  return false;
};

type SessionLike = { sessionId?: number; todoId?: number; isRunning?: boolean };
const toSessionLike = (x: unknown): SessionLike => ({
  sessionId: pickId(x) ?? undefined,
  todoId: pickTodoId(x) ?? undefined,
  isRunning: pickIsRunning(x) || undefined,
});
/** -------------------------------- */

export default function TimerControls({
  todoId,
  onSyncTodoId,
  isRunning,
  isBlocked,
  onStart,
  onPause,
  onStop,
  setIsRunning,
}: TimerControlsProps) {
  const [session, setSession] = useState<SessionLike | null>(null);

  // 중복 호출 가드
  const startInFlight = useRef(false);
  const pauseInFlight = useRef(false);
  const stopInFlight = useRef(false);
  const isStoppingRef = useRef(false);

  // 동일 runningId 재전송 가드
  const lastPausedIdRef = useRef<number | null>(null);
  const lastFinishedIdRef = useRef<number | null>(null);

  // ⏱ 타임스탬프 수집(요구사항: 정지 시 모든 조작 타임스탬프 전송)
  const startedAtRef = useRef<string | null>(null);
  const resumesRef = useRef<string[]>([]);
  const pausesRef = useRef<string[]>([]);

  /** 서버 세션 동기화 */
  useEffect(() => {
    (async () => {
      try {
        const status = await timerApi.getCurrentTimerStatus();
        if (status) {
          const s = toSessionLike(status);
          if (s.todoId && todoId && s.todoId === todoId) {
            setSession(s);
            onSyncTodoId(todoId);
          } else {
            setSession(null);
          }
        } else {
          setSession(null);
        }
      } catch {
        setSession(null);
      }
    })();
  }, [onSyncTodoId, todoId]);

  const resetGuards = () => {
    lastPausedIdRef.current = null;
    lastFinishedIdRef.current = null;
  };

  const resetTimestamps = () => {
    startedAtRef.current = null;
    resumesRef.current = [];
    pausesRef.current = [];
  };

  /** ⏯ 시작/재개 */
  const handleStart = async () => {
    if (startInFlight.current) return;
    startInFlight.current = true;

    if (!todoId) {
      alert('할 일을 선택해 주세요.');
      startInFlight.current = false;
      return;
    }
    if (isBlocked) {
      alert('다른 할일의 타이머가 실행 중입니다.');
      startInFlight.current = false;
      return;
    }

    try {
      // 같은 세션 재개
      if (session?.sessionId && session?.todoId === todoId) {
        const resumed = await timerApi.resumeTimer(session.sessionId);
        setSession(toSessionLike(resumed));
        onSyncTodoId(todoId);
        resetGuards();

        // 타임스탬프 기록 (KST)
        const nowIso = isoKST();
        if (!startedAtRef.current) startedAtRef.current = nowIso; // 최초 시작 없으면 보정
        resumesRef.current.push(nowIso);

        onStart();
        setIsRunning(true);
        return;
      }

      // 서버 상태 기반 재개
      const status = await timerApi.getCurrentTimerStatus().catch(() => null);
      const sid2 = pickId(status);
      const stodo = pickTodoId(status);
      if (sid2 && stodo === todoId) {
        const resumed = await timerApi.resumeTimer(sid2);
        setSession(toSessionLike(resumed));
        onSyncTodoId(todoId);
        resetGuards();

        const nowIso = isoKST();
        if (!startedAtRef.current) startedAtRef.current = nowIso;
        resumesRef.current.push(nowIso);

        onStart();
        setIsRunning(true);
        return;
      }

      // 새로 시작
      const started = await timerApi.startTimer({ todoId });
      setSession(toSessionLike(started));
      onSyncTodoId(todoId);
      resetGuards();

      // 최초 시작 시각 기록 (KST)
      const startIso = isoKST();
      startedAtRef.current = startIso;
      resumesRef.current.push(startIso);

      onStart();
      setIsRunning(true);
    } catch (err) {
      console.error('❌ 타이머 시작/재시작 실패:', err);
      alert(err instanceof Error ? err.message : '타이머 시작/재시작 실패');
    } finally {
      startInFlight.current = false;
    }
  };

  /** ⏸ 일시정지 */
  const handlePause = async () => {
    if (pauseInFlight.current || isStoppingRef.current) return;
    if (isBlocked) return;
    pauseInFlight.current = true;

    try {
      const status = await timerApi.getCurrentTimerStatus().catch(() => null);
      const sid = pickId(status) ?? session?.sessionId ?? null;
      const stodo = pickTodoId(status);
      if (!sid || stodo !== todoId) {
        alert('현재 이 할일의 실행 중인 세션이 없습니다.');
        return;
      }
      if (lastPausedIdRef.current === sid) return;

      await timerApi.pauseTimer(sid);
      lastPausedIdRef.current = sid;

      // 타임스탬프 기록 (KST)
      const pauseIso = isoKST();
      pausesRef.current.push(pauseIso);

      // (옵션) 누적 조회해서 상향 동기화
      let finalTotalSec: number | undefined;
      if (todoId) {
        const res = await timerApi.getTotalRunningTime(todoId);
        finalTotalSec = hmsToSec(res.totalRunningTime);
      }

      onPause(finalTotalSec);
      setIsRunning(false);
    } catch (err) {
      console.error('⛔ 일시정지 실패:', err);
      alert(err instanceof Error ? err.message : '일시정지 실패');
    } finally {
      pauseInFlight.current = false;
    }
  };

  /** ⏹ 정지 */
  const handleStop = async () => {
    if (stopInFlight.current) return;
    if (isBlocked) return;
    stopInFlight.current = true;
    isStoppingRef.current = true;

    try {
      if (!todoId) {
        alert('현재 실행 중인 타이머가 없습니다.');
        return;
      }

      const status = await timerApi.getCurrentTimerStatus().catch(() => null);
      const runningId = pickId(status) ?? session?.sessionId ?? null;
      const stodo = pickTodoId(status);

      if (!runningId || stodo !== todoId) {
        alert('현재 이 할일의 실행 중인 타이머가 없습니다.');
        return;
      }

      // 종료 직전에 총 누적 초 조회
      const total = await timerApi.getTotalRunningTime(todoId);
      const finalTotalSec = hmsToSec(total.totalRunningTime);

      // 세그먼트 구성 (resume[i] ~ pause[i], 마지막은 finishedAt으로 닫기)
      const finishedAt = isoKST();
      const segments: Array<{ startAt: string; endAt: string }> = [];
      const len = Math.max(resumesRef.current.length, pausesRef.current.length);
      for (let i = 0; i < len; i++) {
        const startAt = resumesRef.current[i];
        const endAt = pausesRef.current[i] ?? finishedAt;
        if (startAt) segments.push({ startAt, endAt });
      }

      if (lastFinishedIdRef.current !== runningId) {
        await timerApi.finishTimer(runningId, {
          todoId,
          totalSec: finalTotalSec,
          finishedAt,
          startedAt: startedAtRef.current ?? undefined,
          resumes: resumesRef.current,
          pauses: pausesRef.current,
          segments,
        });

        lastFinishedIdRef.current = runningId;
        onStop(finalTotalSec);
      }

      setIsRunning(false);
      setSession(null);
      resetGuards();
      resetTimestamps(); // 로컬 타임스탬프 초기화
    } catch (err) {
      console.error('❌ 타이머 종료 실패:', err);
      alert(err instanceof Error ? err.message : '타이머 종료 실패');
    } finally {
      isStoppingRef.current = false;
      stopInFlight.current = false;
    }
  };

  return (
    <div className="mt-24 mb-12 flex justify-center gap-20 md:mt-88 md:mb-80 md:gap-32">
      {!isRunning ? (
        <button
          aria-label="시작"
          onClick={handleStart}
          disabled={isBlocked || !todoId || startInFlight.current}
          className="flex h-60 w-60 items-center justify-center disabled:opacity-40 md:h-88 md:w-88"
        >
          <Image
            src={`${CLOUDFRONT_URL}/assets/images/timer_start.svg`}
            alt="타이머 시작 이미지"
            width={88}
            height={88}
            className="h-60 w-60 md:h-88 md:w-88"
          />
        </button>
      ) : (
        <>
          <button
            aria-label="일시정지"
            onClick={handlePause}
            disabled={isBlocked || pauseInFlight.current || isStoppingRef.current}
            className="flex h-60 w-60 items-center justify-center disabled:opacity-40 md:h-88 md:w-88"
          >
            <Image
              src={`${CLOUDFRONT_URL}/assets/images/timer_stop.svg`}
              alt="타이머 정지 이미지"
              width={88}
              height={88}
              className="h-60 w-60 md:h-88 md:w-88"
            />
          </button>

          <button
            aria-label="중지"
            onClick={handleStop}
            disabled={isBlocked || stopInFlight.current}
            className="flex h-60 w-60 items-center justify-center disabled:opacity-40 md:h-88 md:w-88"
          >
            <Image
              src={`${CLOUDFRONT_URL}/assets/images/timer_pause.svg`}
              alt="타이머 일시정지 이미지"
              width={88}
              height={88}
              className="h-60 w-60 md:h-88 md:w-88"
            />
          </button>
        </>
      )}
    </div>
  );
}
