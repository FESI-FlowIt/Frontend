'use client';

import Image from 'next/image';

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
  return (
    <div className="mt-88 mb-80 flex justify-center gap-32">
      {!isRunning ? (
        <button
          aria-label="시작"
          onClick={onStart}
          disabled={isBlocked}
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
            onClick={onPause}
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
            onClick={onStop}
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
