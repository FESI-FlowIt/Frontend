'use client';

import Image from 'next/image';

interface TimerControlsProps {
  isRunning: boolean;
  isBlocked: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

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
          <Image src="/assets/icons/startIcon.svg" alt="Start Icon" width={88} height={88} />
        </button>
      ) : (
        <>
          <button
            aria-label="일시정지"
            onClick={onPause}
            className="flex h-88 w-88 cursor-pointer items-center justify-center"
          >
            <Image src="/assets/icons/stopIcon.svg" alt="Stop Icon" width={88} height={88} />
          </button>

          <button
            aria-label="중지"
            onClick={onStop}
            className="flex h-88 w-88 cursor-pointer items-center justify-center"
          >
            <Image src="/assets/icons/pauseIcon.svg" alt="Pause Icon" width={88} height={88} />
          </button>
        </>
      )}
    </div>
  );
}
