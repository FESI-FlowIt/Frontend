'use client';

import Image from 'next/image';

import { useTimerStore } from '@/store/timerStore';

const CLOUDFRONT_URL = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_IMAGE_URL}`;

interface TimerControlsProps {
  todoId: number | null;
}

export default function TimerControls({ todoId }: TimerControlsProps) {
  const isRunning = useTimerStore(s => s.isRunning);
  const runningTodoId = useTimerStore(s => s.todoId);

  const sameTodo = Boolean(
    isRunning && runningTodoId != null && todoId != null && runningTodoId === todoId,
  );
  const blocked = Boolean(
    isRunning && runningTodoId != null && todoId != null && runningTodoId !== todoId,
  );

  const startInFlight = useTimerStore(s => s.startInFlight);
  const pauseInFlight = useTimerStore(s => s.pauseInFlight);
  const stopInFlight = useTimerStore(s => s.stopInFlight);
  const isStopping = useTimerStore(s => s.isStopping);

  const start = useTimerStore(s => s.start);
  const pause = useTimerStore(s => s.pause);
  const stop = useTimerStore(s => s.stop);

  const handleStart = () => {
    if (!todoId) return alert('할 일을 선택해 주세요.');
    if (blocked || startInFlight || pauseInFlight || stopInFlight || isStopping) return;
    start(todoId);
  };

  const handlePause = () => {
    if (!sameTodo || pauseInFlight || isStopping) return;
    pause();
  };

  const handleStop = async () => {
    if (!sameTodo || !todoId || stopInFlight) return;
    try {
      await stop();
    } catch {
      // no-op //
    }
  };

  return (
    <div className="mt-24 mb-12 flex justify-center gap-20 md:mt-88 md:mb-80 md:gap-32">
      {!sameTodo ? (
        <button
          aria-label="시작"
          onClick={handleStart}
          disabled={
            blocked || !todoId || startInFlight || pauseInFlight || stopInFlight || isStopping
          }
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
            disabled={pauseInFlight || isStopping}
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
            disabled={stopInFlight}
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
