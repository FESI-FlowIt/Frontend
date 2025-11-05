'use client';

import Image from 'next/image';

import { useTimerStore } from '@/store/timerStore';

const CLOUDFRONT_URL = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_IMAGE_URL}`;

export interface TimerControlsProps {
  todoId: number | null;
  /** 중지(세션 종료) 후 상위에서 후속 처리하도록 알림 — 완료 아님 */
  onStopped?: () => void;
}

export default function TimerControls({ todoId, onStopped }: TimerControlsProps) {
  const isRunning = useTimerStore(s => s.isRunning);
  const runningTodoId = useTimerStore(s => s.todoId);

  // 🔐 서버/스토어 불일치 대비: 러닝 앵커가 하나라도 있어야 실제 running 으로 간주
  const resumeAtMs = useTimerStore(s => s.resumeAtMs);
  const mainStartAtMs = useTimerStore(s => s.mainStartAtMs);
  const uiRunning = Boolean(isRunning && (resumeAtMs != null || mainStartAtMs != null));

  const sameTodo = Boolean(
    uiRunning && runningTodoId != null && todoId != null && runningTodoId === todoId,
  );
  const blocked = Boolean(
    uiRunning && runningTodoId != null && todoId != null && runningTodoId !== todoId,
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
    // 서버가 paused 상태였던 경우에도 start가 재시작(resume) 역할을 수행해야 함
    start(todoId);
  };

  const handlePause = () => {
    // 🔐 실제 러닝이 아닐 때(서버 paused 등) 방어적으로 막기 → 400 예방
    if (!uiRunning || !sameTodo || pauseInFlight || isStopping) return;
    pause();
  };

  const handleStop = async () => {
    // 정지(세션 종료). 완료 아님. 모달 닫지 않음(부모에서 onStopped 안 넘기면 그대로 유지)
    if (!uiRunning || !sameTodo || !todoId || stopInFlight) return;
    try {
      await stop();
      onStopped?.();
    } catch {
      // no-op
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
          {/* ⛔️ 이미지/alt 그대로 둠 */}
          <button
            aria-label="일시정지"
            onClick={handlePause}
            disabled={pauseInFlight || isStopping}
            className="flex h-60 w-60 items-center justify-center disabled:opacity-40 md:h-88 md:w-88"
          >
            <Image
              src={`${CLOUDFRONT_URL}/assets/images/timer_stop.svg`}
              alt="타이머 중지 이미지"
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
