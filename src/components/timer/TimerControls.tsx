'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { timerApi } from '@/api/timerApi';
import { TimerSession, InProgressGoal } from '@/interfaces/timer';
import { useTimerStore } from '@/store/timerStore';

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

    //forceStopTimer();
  }, []);

  const handleStart = async () => {
    console.log('▶️ handleStart 실행됨');
    if (!todoId) {
      console.warn('⛔️ todoId가 없음');
      return;
    }

    try {
      // 1) 로컬 세션이 있으면 'isRunning' 여부와 상관없이 일단 resume 먼저 시도
      if (session?.sessionId) {
        try {
          const resumed = await timerApi.resumeTimer(Number(session.sessionId));
          console.log('🔄 로컬 세션 재시작 완료:', resumed);
          useTimerStore.getState().startTimer(resumed.todoId);
          setSession(resumed);
          onStart();
          return;
        } catch (e) {
          console.warn('⚠️ 로컬 세션 resume 실패. 서버 상태 확인 후 진행:', e);
        }
      }

      // 2) 서버 상태 조회 → 세션이 있으면 'isRunning' 값과 무관하게 resume 먼저 시도
      const status = await timerApi.getCurrentTimerStatus();
      console.log('🟡 서버 현재 타이머 상태:', status);

      if (status?.sessionId) {
        try {
          const resumed = await timerApi.resumeTimer(Number(status.sessionId));
          console.log('🔄 서버 세션 재시작 완료:', resumed);
          useTimerStore.getState().startTimer(resumed.todoId);
          setSession(resumed);
          onStart();
          return;
        } catch (e) {
          console.warn('⚠️ 서버 세션 resume 실패. 새로 시작 시도:', e);
          // 계속 진행해서 새로 시작
        }
      }

      // 3) 여기까지 왔으면 새로 시작
      const started = await timerApi.startTimer({ todoId });
      console.log('✅ 타이머 시작 완료:', started);
      setSession(started);
      useTimerStore.getState().startTimer(started.todoId);
      onStart();
    } catch (err) {
      console.error('❌ 타이머 시작/재시작 실패:', err);
    }
  };

  const handlePause = async () => {
    try {
      if (!session) throw new Error('세션 정보가 없습니다.');

      const paused = await timerApi.pauseTimer(Number(session.sessionId));
      console.log('⏸ 일시정지 성공:', paused);

      useTimerStore.getState().pauseTimer(paused.todoId);
      setSession(paused);
      onPause();
    } catch (err) {
      console.error('⛔ 일시정지 실패:', err);
    }
  };

  const handleStop = async () => {
    try {
      const status = await timerApi.getCurrentTimerStatus();

      if (!status || !status.sessionId) {
        alert('현재 실행 중인 타이머가 없습니다.');
        return;
      }

      await timerApi.finishTimer(Number(status.sessionId));
      setSession(null);
      onStop();
    } catch (err) {
      console.error('❌ 타이머 종료 실패:', err);
      alert(err instanceof Error ? err.message : '타이머 종료 실패');
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
