'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { timerApi } from '@/api/timerApi';
import { TimerSession } from '@/interfaces/timer';

interface TimerControlsProps {
  todoId: number | null;
  onSyncTodoId: (id: number) => void;
  isRunning: boolean;
  isBlocked: boolean;
  onStart: (resumeAtMs?: number) => void;
  onPause: () => void;
  onStop: () => void;
  setIsRunning: (running: boolean) => void;
}

const CLOUDFRONT_URL = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_IMAGE_URL}`;

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
  const [session, setSession] = useState<TimerSession | null>(null);

  // 요청 중 더블클릭 가드
  const startInFlight = useRef(false);
  const pauseInFlight = useRef(false);
  const stopInFlight = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const status = await timerApi.getCurrentTimerStatus();
        if (status) {
          setSession(status);
          if (status.todoId) onSyncTodoId(Number(status.todoId));
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
      if (session?.sessionId) {
        try {
          const resumed = await timerApi.resumeTimer(Number(session.sessionId));
          setSession(resumed);
          if (resumed.todoId) onSyncTodoId(Number(resumed.todoId));

          const resumeAtMs = (resumed as any).resumeDateTime
            ? new Date((resumed as any).resumeDateTime).getTime()
            : resumed.startedDateTime
              ? new Date(resumed.startedDateTime).getTime()
              : undefined;

          onStart(resumeAtMs);
          setIsRunning(true);
          return;
        } catch {}
      }

      const status = await timerApi.getCurrentTimerStatus();
      if (status?.sessionId) {
        try {
          const resumed = await timerApi.resumeTimer(Number(status.sessionId));
          setSession(resumed);
          if (resumed.todoId) onSyncTodoId(Number(resumed.todoId));

          const resumeAtMs = (resumed as any).resumeDateTime
            ? new Date((resumed as any).resumeDateTime).getTime()
            : resumed.startedDateTime
              ? new Date(resumed.startedDateTime).getTime()
              : undefined;

          onStart(resumeAtMs);
          setIsRunning(true);
          return;
        } catch {}
      }

      const started = await timerApi.startTimer({ todoId });
      setSession(started);
      if (started.todoId) onSyncTodoId(Number(started.todoId));

      const startAtMs = started.startedDateTime
        ? new Date(started.startedDateTime).getTime()
        : undefined;

      onStart(startAtMs);
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
      if (!session?.sessionId) {
        alert('세션 정보가 없습니다.');
        return;
      }
      await timerApi.pauseTimer(Number(session.sessionId));
      onPause(); // 모달이 live를 한 번만 고정
      setIsRunning(false); // 모달 쪽 pauseMain 트리거
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
      const status = await timerApi.getCurrentTimerStatus();
      if (!status?.sessionId) {
        alert('현재 실행 중인 타이머가 없습니다.');
        return;
      }
      await timerApi.finishTimer(Number(status.sessionId));
      setSession(null);
      onStop(); // 모달이 live 고정 + 리셋
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
          className="flex h-88 w-88 cursor-pointer items-center justify-center disabled:opacity-40"
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
            className="flex h-88 w-88 cursor-pointer items-center justify-center disabled:opacity-40"
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
            className="flex h-88 w-88 cursor-pointer items-center justify-center disabled:opacity-40"
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
