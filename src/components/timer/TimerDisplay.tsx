'use client';

import React from 'react';

interface TimerDisplayProps {
  hours: string;
  minutes: string;
  seconds: string;
}

export default function TimerDisplay({ hours, minutes, seconds }: TimerDisplayProps) {
  return (
    <div className="mb-60 flex items-end justify-center gap-8 text-center">
      <span className="text-[80px] leading-[82px] font-bold">{hours}</span>
      <span className="text-display-32 leading-[82px]">:</span>
      <span className="text-[80px] leading-[82px] font-bold">{minutes}</span>
      <span className="text-display-32 leading-[82px]">:</span>
      <span className="text-[80px] leading-[82px] font-bold">{seconds}</span>
    </div>
  );
}
