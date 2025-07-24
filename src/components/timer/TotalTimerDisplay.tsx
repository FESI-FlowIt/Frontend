'use client';

import React from 'react';

interface TotalTimeDisplayProps {
  totalH: string;
  totalM: string;
  totalS: string;
}

export default function TotalTimeDisplay({ totalH, totalM, totalS }: TotalTimeDisplayProps) {
  return (
    <>
      <div className="bg-line mb-16 h-px w-full" />
      <div className="text-center">
        <div className="text-text-02 text-display-24 mb-16 leading-30">
          총 {totalH}:{totalM}:{totalS}
        </div>
        <div className="text-text-03 text-body-m-20">누적 작업 시간</div>
      </div>
    </>
  );
}
