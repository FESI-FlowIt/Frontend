'use client';

import React from 'react';

interface TimerDisplayProps {
  hours: string;
  minutes: string;
  seconds: string;
}

export default function TimerDisplay({ hours, minutes, seconds }: TimerDisplayProps) {
  return (
    <div className="mb-16 flex items-end justify-center gap-4 text-center md:mb-60 md:gap-8">
      <span className="text-display-32 font-bold md:text-[80px] md:leading-[82px]">{hours}</span>
      <span className="text-display-32 md:leading-[82px]">:</span>
      <span className="text-display-32 font-bold md:text-[80px] md:leading-[82px]">{minutes}</span>
      <span className="text-display-32 md:leading-[82px]">:</span>
      <span className="text-display-32 font-bold md:text-[80px] md:leading-[82px]">{seconds}</span>
    </div>
  );
}
