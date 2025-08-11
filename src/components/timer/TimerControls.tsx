'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { timerApi } from '@/api/timerApi';

interface TimerControlsProps {
  todoId: number | null;
  onSyncTodoId: (id: number) => void;
  isRunning: boolean;
  isBlocked: boolean;
  onStart: () => void;
  onPause: (finalTotalSec?: number) => void;
  onStop: (finalTotalSec?: number) => void;
  setIsRunning: (running: boolean) => void;
}

const CLOUDFRONT_URL = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_IMAGE_URL}`;

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

  // 정지 처리 중에는 pause 클릭/요청 무시
  const isStoppingRef = useRef(false);

  // 동일 runningId로 pause/finish 중복 전송 방지
  const lastPausedIdRef = useRef<number | null>(null);
  const lastFinishedIdRef = useRef<number | null>(null);

  // 서버 세션 동기화: 이 모달의 todoId와 같은 세션만 연결
  useEffect(() => {
    (async () => {
      try {
        const status = await timerApi.getCurrentTimerStatus();
        if (status) {
          const s = toSessionLike(status);
          if (s.todoId && todoId && s.todoId === todoId) {
            setSession(s);
            // 동일할 때만 동기화(다른 할일로 바꾸지 않음)
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
      // 1) 같은 할일 세션만 재개 허용
      if (session?.sessionId && session?.todoId === todoId) {
        try {
          const resumed = await timerApi.resumeTimer(session.sessionId);
          const s = toSessionLike(resumed);
          setSession(s);
          onSyncTodoId(todoId);
          resetGuards();
          onStart();
          setIsRunning(true);
          return;
        } catch {}
      }

      // 2) 서버 상태 기반 재개 (같은 todo일 때만)
      const status = await timerApi.getCurrentTimerStatus().catch(() => null);
      const sid2 = pickId(status);
      const stodo = pickTodoId(status);
      if (sid2 && stodo === todoId) {
        try {
          const resumed = await timerApi.resumeTimer(sid2);
          const s = toSessionLike(resumed);
          setSession(s);
          onSyncTodoId(todoId);
          resetGuards();
          onStart();
          setIsRunning(true);
          return;
        } catch {}
      }

      // 3) 새 세션 시작
      const started = await timerApi.startTimer({ todoId });
      const s = toSessionLike(started);
      setSession(s);
      onSyncTodoId(todoId);
      resetGuards();
      onStart();
      setIsRunning(true);
    } catch (err) {
      console.error('❌ 타이머 시작/재시작 실패:', err);
      alert(err instanceof Error ? err.message : '타이머 시작/재시작 실패');
    } finally {
      startInFlight.current = false;
    }
  };

  // 사용자가 누르는 "일시정지"
  const handlePause = async () => {
    if (pauseInFlight.current || isStoppingRef.current) return; // 정지 중엔 무시
    if (isBlocked) return; // 다른 할일이 돌면 조작 금지
    pauseInFlight.current = true;

    try {
      const status = await timerApi.getCurrentTimerStatus().catch(() => null);
      const sid = pickId(status) ?? session?.sessionId ?? null;
      const stodo = pickTodoId(status);

      if (!sid || stodo !== todoId) {
        alert('현재 이 할일의 실행 중인 세션이 없습니다.');
        return;
      }

      // 동일 ID로 두 번 pause 방지
      if (lastPausedIdRef.current === sid) return;

      await timerApi.pauseTimer(sid);
      lastPausedIdRef.current = sid;

      // (옵션) 누적 조회해서 상향 동기화
      let finalTotalSec: number | undefined;
      if (todoId) {
        try {
          const res = await timerApi.getTotalRunningTime(todoId);
          finalTotalSec = hmsToSec(res.totalRunningTime);
        } catch {}
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

  // 사용자가 누르는 "정지"
  const handleStop = async () => {
    if (stopInFlight.current) return;
    if (isBlocked) return; // 다른 할일이 돌면 조작 금지
    stopInFlight.current = true;
    isStoppingRef.current = true;

    try {
      if (!todoId) {
        alert('현재 실행 중인 타이머가 없습니다.');
        return;
      }

      // 최신 실행 ID 확보
      const status = await timerApi.getCurrentTimerStatus().catch(() => null);
      const runningId = pickId(status) ?? session?.sessionId ?? null;
      const stodo = pickTodoId(status);

      if (!runningId || stodo !== todoId) {
        alert('현재 이 할일의 실행 중인 타이머가 없습니다.');
        return;
      }

      // ✅ pause 호출하지 않음 (이중 합산 방지)
      if (lastFinishedIdRef.current !== runningId) {
        await timerApi.finishTimer(runningId);
        lastFinishedIdRef.current = runningId;
      }

      // finish 후 최종 누적 1회 조회 → 모달로 전달(상향만)
      let finalTotalSec: number | undefined;
      try {
        const total = await timerApi.getTotalRunningTime(todoId);
        const [h = '0', m = '0', s = '0'] = (total.totalRunningTime ?? '00:00:00').split(':');
        finalTotalSec = (+h || 0) * 3600 + (+m || 0) * 60 + (+s || 0);
      } catch {}

      onStop(finalTotalSec);
      setIsRunning(false);
      setSession(null);
      lastPausedIdRef.current = null;
      lastFinishedIdRef.current = null;
    } catch (err) {
      console.error('❌ 타이머 종료 실패:', err);
      alert(err instanceof Error ? err.message : '타이머 종료 실패');
    } finally {
      isStoppingRef.current = false;
      stopInFlight.current = false;
    }
  };

  return (
    <div className="mt-88 mb-80 flex justify-center gap-32">
      {!isRunning ? (
        <button
          aria-label="시작"
          onClick={handleStart}
          disabled={isBlocked || !todoId || startInFlight.current}
          className="flex h-88 w-88 items-center justify-center disabled:opacity-40"
        >
          <Image
            src={`${CLOUDFRONT_URL}/assets/images/timer_start.svg`}
            alt="타이머 시작 이미지"
            width={88}
            height={88}
          />
        </button>
      ) : (
        <>
          <button
            aria-label="일시정지"
            onClick={handlePause}
            disabled={isBlocked || pauseInFlight.current || isStoppingRef.current}
            className="flex h-88 w-88 items-center justify-center disabled:opacity-40"
          >
            <Image
              src={`${CLOUDFRONT_URL}/assets/images/timer_stop.svg`}
              alt="타이머 정지 이미지"
              width={88}
              height={88}
            />
          </button>
          <button
            aria-label="중지"
            onClick={handleStop}
            disabled={isBlocked || stopInFlight.current}
            className="flex h-88 w-88 items-center justify-center disabled:opacity-40"
          >
            <Image
              src={`${CLOUDFRONT_URL}/assets/images/timer_pause.svg`}
              alt="타이머 일시정지 이미지"
              width={88}
              height={88}
            />
          </button>
        </>
      )}
    </div>
  );
}
