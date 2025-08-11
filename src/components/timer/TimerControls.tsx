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

// "HH:MM:SS" -> seconds
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

  useEffect(() => {
    (async () => {
      try {
        const status = await timerApi.getCurrentTimerStatus();
        if (status) {
          const s = toSessionLike(status);
          setSession(s);
          if (s.todoId) onSyncTodoId(s.todoId);
        }
      } catch {}
    })();
  }, [onSyncTodoId]);

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
      // 1) 기존 세션 재개
      if (session?.sessionId) {
        try {
          const resumed = await timerApi.resumeTimer(session.sessionId);
          const s = toSessionLike(resumed);
          setSession(s);
          if (s.todoId) onSyncTodoId(s.todoId);
          onStart();
          setIsRunning(true);
          return;
        } catch {}
      }

      // 2) 서버 상태 기반 재개
      const status = await timerApi.getCurrentTimerStatus().catch(() => null);
      const sid2 = pickId(status);
      if (sid2) {
        try {
          const resumed = await timerApi.resumeTimer(sid2);
          const s = toSessionLike(resumed);
          setSession(s);
          if (s.todoId) onSyncTodoId(s.todoId);
          onStart();
          setIsRunning(true);
          return;
        } catch {}
      }

      // 3) 새 세션 시작
      const started = await timerApi.startTimer({ todoId });
      const s = toSessionLike(started);
      setSession(s);
      if (s.todoId) onSyncTodoId(s.todoId);
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
    pauseInFlight.current = true;

    try {
      const status = await timerApi.getCurrentTimerStatus().catch(() => null);
      const sid = pickId(status) ?? session?.sessionId ?? null;
      if (!sid) {
        alert('세션 정보가 없습니다.');
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
    stopInFlight.current = true;
    isStoppingRef.current = true; // 이 동안 들어오는 pause는 무시

    try {
      if (!todoId) {
        alert('현재 실행 중인 타이머가 없습니다.');
        return;
      }

      // 1) 최신 실행 ID 확보
      const status = await timerApi.getCurrentTimerStatus().catch(() => null);
      const runningId = pickId(status) ?? session?.sessionId ?? null;
      if (!runningId) {
        alert('현재 실행 중인 타이머가 없습니다.');
        return;
      }

      // 2) 마지막 러닝 구간을 서버에 확정 (조용히 1회만)
      if (lastPausedIdRef.current !== runningId) {
        try {
          await timerApi.pauseTimer(runningId);
        } catch {
          /* 이미 멈춤이면 무시 */
        }
        lastPausedIdRef.current = runningId;
      }
      // 절대 onPause() 호출하지 않음 ← 정지 시 “일시정지 응답 두 번” 방지 포인트

      // 3) pause 직후 누적을 조회해 즉시 UI 반영(새로고침 대비)
      let midTotalSec = 0;
      try {
        const total = await timerApi.getTotalRunningTime(todoId);
        midTotalSec = hmsToSec(total.totalRunningTime);
      } catch {}
      onStop(midTotalSec);
      setIsRunning(false);

      // 4) 세션 종료 (동일 ID 2번 finish 방지)
      if (lastFinishedIdRef.current !== runningId) {
        await timerApi.finishTimer(runningId);
        lastFinishedIdRef.current = runningId;
      }

      // 5) 최종 상향 보정(서버가 finish 반영했다면 조금 더 커질 수 있음)
      try {
        const final = await timerApi.getTotalRunningTime(todoId);
        const finalSec = hmsToSec(final.totalRunningTime);
        if (finalSec > midTotalSec) onStop(finalSec);
      } catch {}

      setSession(null);
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
            disabled={pauseInFlight.current || isStoppingRef.current}
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
            disabled={stopInFlight.current}
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
