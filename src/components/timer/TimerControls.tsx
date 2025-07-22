'use client';

import React from 'react';

import StartIcon from '@/../public/assets/icons/startIcon.svg';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

export default function TimerControls({ isRunning, onStart, onPause, onStop }: TimerControlsProps) {
  return (
    <div className="mt-60 mb-80 flex justify-center gap-32">
      {!isRunning ? (
        <button
          aria-label="시작"
          className="border-line bg-tertiary-01 flex h-88 w-88 cursor-pointer items-center justify-center rounded-full border"
          onClick={onStart}
        >
          <StartIcon className="text-primary-01 h-48 w-48" />
        </button>
      ) : (
        <>
          <button
            aria-label="일시정지"
            className="border-line bg-tertiary-01 flex h-88 w-88 cursor-pointer items-center justify-center rounded-full border"
            onClick={onPause}
          >
            <div className="flex gap-7">
              <div className="bg-primary-01 h-43 w-11 rounded-sm" />
              <div className="bg-primary-01 h-43 w-11 rounded-sm" />
            </div>
          </button>

          <button
            aria-label="중지"
            className="border-line bg-tertiary-01 flex h-88 w-88 cursor-pointer items-center justify-center rounded-full border"
            onClick={onStop}
          >
            <div className="bg-error h-41 w-41 rounded-[4px]" />
          </button>
        </>
      )}
    </div>
  );
}
