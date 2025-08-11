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

// HH:MM:SS -> sec
const hmsToSec = (hms?: string) => {
  const [h = '0', m = '0', s = '0'] = (hms ?? '00:00:00').split(':');
  return (+h || 0) * 3600 + (+m || 0) * 60 + (+s || 0);
};

/** ---------- 타입가드 & 파서 (any 금지) ---------- */
const asObj = (x: unknown): Record<string, unknown> | null =>
  x && typeof x === 'object' ? (x as Record<string, unknown>) : null;

const getContainerChain = (x: unknown): Array<Record<string, unknown>> => {
  const root = asObj(x);
  const res = root?.result ? asObj(root.result) : null;
  // 필요 시 더 깊게 확장 가능: const res2 = res?.result ? asObj(res.result) : null;
  return [root, res].filter(Boolean) as Array<Record<string, unknown>>;
};

const parseNumish = (v: unknown): number | null => {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string') {
    // "365" 같은 숫자 문자열 지원
    if (/^\d+$/.test(v.trim())) return Number(v);
  }
  return null;
};

const parseBoolish = (v: unknown): boolean | null => {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'number') return v === 1 ? true : v === 0 ? false : null;
  if (typeof v === 'string') {
    const t = v.trim().toLowerCase();
    if (t === 'true') return true;
    if (t === 'false') return false;
    if (t === '1') return true;
    if (t === '0') return false;
  }
  return null;
};

// 어떤 응답이 와도 id를 뽑는다 (최상위, result.* 모두 검사, 숫자/문자열 지원)
const pickId = (x: unknown): number | null => {
  const containers = getContainerChain(x);
  const keys = ['todoTimerId', 'sessionId', 'id'];
  for (const c of containers) {
    for (const k of keys) {
      const n = parseNumish(c[k]);
      if (n != null) return n;
    }
  }
  return null;
};

const pickTodoId = (x: unknown): number | null => {
  const containers = getContainerChain(x);
  for (const c of containers) {
    const n = parseNumish(c['todoId']);
    if (n != null) return n;
  }
  return null;
};

const pickIsRunning = (x: unknown): boolean => {
  const containers = getContainerChain(x);
  for (const c of containers) {
    const b = parseBoolish(c['isRunning']);
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
/** ---------------------------------------------- */

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

  // 더블클릭 가드
  const startInFlight = useRef(false);
  const pauseInFlight = useRef(false);
  const stopInFlight = useRef(false);

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

  const handlePause = async () => {
    if (pauseInFlight.current) return;
    pauseInFlight.current = true;

    try {
      // 최신 세션 ID 확보(문자열도 파싱)
      const status = await timerApi.getCurrentTimerStatus().catch(() => null);
      const sid = pickId(status) ?? session?.sessionId ?? null;

      if (!sid) {
        alert('세션 정보가 없습니다.');
        return;
      }

      await timerApi.pauseTimer(sid);

      // (옵션) 현재 누적 조회
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

  const handleStop = async () => {
    if (stopInFlight.current) return;
    stopInFlight.current = true;

    try {
      if (!todoId) {
        alert('현재 실행 중인 타이머가 없습니다.');
        return;
      }

      // 1) 정지 직전 누적(디버깅용)
      const before = await timerApi
        .getTotalRunningTime(todoId)
        .catch(() => ({ totalRunningTime: '00:00:00' }));
      const beforeSec = hmsToSec(before.totalRunningTime);

      // 2) 최신 실행 ID 확보 (result.* 포함 탐색하는 pickId 사용)
      const status = await timerApi.getCurrentTimerStatus().catch(() => null);
      const finishId = pickId(status) ?? session?.sessionId ?? null;
      if (!finishId) {
        alert('현재 실행 중인 타이머가 없습니다.');
        return;
      }

      // 3) ❌ 추가 pause 호출 금지 — 바로 finish만 호출
      const finished = await timerApi.finishTimer(finishId);

      // (선택) 마지막 블록 시간 파싱
      const lastRunSec = (() => {
        const o =
          finished && typeof finished === 'object' ? (finished as Record<string, unknown>) : {};
        const rt = typeof o.runningTime === 'string' ? o.runningTime : '00:00:00';
        return hmsToSec(rt);
      })();

      // 4) 최종 누적(서버 권위)
      const after = await timerApi.getTotalRunningTime(todoId);
      const finalTotalSec = hmsToSec(after.totalRunningTime);

      // 디버깅 로그: 전체 증가와 마지막 블록 비교
      console.log('[stop] deltaTotal=', finalTotalSec - beforeSec, 'lastBlock=', lastRunSec);

      setSession(null);
      onStop(finalTotalSec); // 프론트는 서버 누적만 반영
      setIsRunning(false);
    } catch (err) {
      console.error('❌ 타이머 종료 실패:', err);
      alert(err instanceof Error ? err.message : '타이머 종료 실패');
    } finally {
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
            disabled={pauseInFlight.current}
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
