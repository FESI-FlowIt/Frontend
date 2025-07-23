'use client';

import React from 'react';

import PauseIcon from '@/../public/assets/icons/pauseIcon.svg';
import StartIcon from '@/../public/assets/icons/startIcon.svg';
import StopIcon from '@/../public/assets/icons/stopIcon.svg';

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
    <div className="mt-60 mb-80 flex justify-center gap-32">
      {!isRunning ? (
        <button
          aria-label="시작"
          onClick={onStart}
          disabled={isBlocked}
          className="flex h-88 w-88 cursor-pointer items-center justify-center disabled:opacity-40"
        >
          <StartIcon className="h-full w-full" />
        </button>
      ) : (
        <>
          <button
            aria-label="일시정지"
            onClick={onPause}
            className="flex h-88 w-88 cursor-pointer items-center justify-center"
          >
            <StopIcon className="h-full w-full" />
          </button>

          <button
            aria-label="중지"
            onClick={onStop}
            className="flex h-88 w-88 cursor-pointer items-center justify-center"
          >
            <PauseIcon className="h-full w-full" />
          </button>
        </>
      )}
    </div>
  );
}
