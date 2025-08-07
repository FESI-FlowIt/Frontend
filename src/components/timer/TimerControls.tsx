'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { timerApi } from '@/api/timerApi';
import { TimerSession, InProgressGoal } from '@/interfaces/timer';

interface TimerControlsProps {
  isRunning: boolean;
  isBlocked: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

const CLOUDFRONT_URL = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_IMAGE_URL}`;

export default function TimerControls({
  isRunning,
  isBlocked,
  onStart,
  onPause,
  onStop,
}: TimerControlsProps) {
  const [session, setSession] = useState<TimerSession | null>(null);
  const [todoId, setTodoId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTodoId = async () => {
      try {
        const goals: InProgressGoal[] = await timerApi.getInProgressGoals();
        const firstTodoId = goals[0]?.todos[0]?.todoId ?? null;
        if (firstTodoId) {
          setTodoId(firstTodoId);
          console.log('✅ 사용할 todoId:', firstTodoId);
        }
      } catch (err) {
        console.error('❌ 할 일 불러오기 실패:', err);
      }
    };
    fetchTodoId();
  }, []);

  useEffect(() => {
    const checkCurrentTimer = async () => {
      try {
        const status = await timerApi.getCurrentTimerStatus();
        console.log('현재 실행 중인 세션 상태 👉', status);

        if (status !== null) {
          setSession(status);
        }
      } catch (err) {
        console.warn('🚨 현재 실행 중인 세션 없음 또는 응답 오류');
      }
    };
    checkCurrentTimer();
  }, []);
  useEffect(() => {
    const forceStopTimer = async () => {
      try {
        const status = await timerApi.getCurrentTimerStatus();
        if (status?.sessionId) {
          await timerApi.finishTimer(Number(status.sessionId));
          console.log('✅ 강제 종료 완료');
        } else {
          console.log('⛔️ 실행 중인 타이머가 없습니다.');
        }
      } catch (e) {
        console.error('❌ 강제 종료 실패:', e);
      }
    };

    // ✅ 주석을 해제하면 이 페이지 렌더링 시 한 번 실행됨
    //forceStopTimer();
  }, []);

  const handleStart = async () => {
    console.log('▶️ handleStart 실행됨');

    if (!todoId) {
      console.warn('⛔️ todoId가 없음');
      return;
    }

    try {
      const status = await timerApi.getCurrentTimerStatus();
      console.log('🟡 현재 타이머 상태:', status);

      if (status !== null) {
        alert('이미 실행 중인 타이머가 있습니다.');
        return;
      }

      console.log('🟢 타이머 시작 요청 보냄');

      const started = await timerApi.startTimer({ todoId });

      // ✅ 응답 콘솔 확인
      console.log('✅ 타이머 시작 완료 (mapper 처리 후):', started);

      setSession(started);
      onStart();
    } catch (err) {
      console.error('❌ 타이머 시작 실패:', err);
    }
  };

  const handlePause = async () => {
    if (!session) return;
    try {
      await timerApi.pauseTimer(Number(session.sessionId));
      onPause();
    } catch (err) {
      console.error('❌ 타이머 일시정지 실패:', err);
    }
  };

  const handleStop = async () => {
    if (!session) return;
    try {
      await timerApi.finishTimer(Number(session.sessionId));
      setSession(null);
      onStop();
    } catch (err) {
      console.error('❌ 타이머 종료 실패:', err);
    }
  };

  return (
    <div className="mt-88 mb-80 flex justify-center gap-32">
      {!isRunning ? (
        <button
          aria-label="시작"
          onClick={handleStart}
          disabled={isBlocked || !todoId}
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
            className="flex h-88 w-88 cursor-pointer items-center justify-center"
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
            className="flex h-88 w-88 cursor-pointer items-center justify-center"
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
