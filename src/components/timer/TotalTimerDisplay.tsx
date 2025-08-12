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
        {/* 총 시간 */}
        <div className="text-text-02 md:text-display-24 text-body-sb-20 mb-12 leading-30 md:mb-16">
          총 {totalH}:{totalM}:{totalS}
        </div>

        {/* 누적 작업 시간 */}
        <div className="text-text-03 text-body-m-16 md:text-body-m-20">누적 작업 시간</div>
      </div>
    </>
  );
}
