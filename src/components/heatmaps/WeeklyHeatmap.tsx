'use client';

import React from 'react';

import HeatmapCell from './HeatmapCell';

type TimeSlotKey = 'dawn' | 'morning' | 'afternoon' | 'evening';

interface TimeSlot {
  minutes: number;
  intensity: 0 | 1 | 2 | 3 | 4;
}

interface DayData {
  date: string;
  time_slots: Record<TimeSlotKey, TimeSlot>;
}

export interface WeeklyHeatmapResponse {
  success: boolean;
  data: {
    week_start: string;
    week_end: string;
    days: DayData[];
  };
}

const TIME_LABELS: Record<TimeSlotKey, string> = {
  dawn: '새벽\n00-06',
  morning: '오전\n06-12',
  afternoon: '오후\n12-18',
  evening: '밤\n18-24',
};

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

interface WeeklyHeatmapProps {
  data: WeeklyHeatmapResponse['data'];
}

const WeeklyHeatmap: React.FC<WeeklyHeatmapProps> = ({ data }) => {
  const timeKeys: TimeSlotKey[] = ['dawn', 'morning', 'afternoon', 'evening'];

  return (
    <div className="flex flex-col">
      {/* 열 헤더: 시간대 */}
      <div className="mb-12 ml-[36px] flex gap-x-4">
        {timeKeys.map(key => (
          <div
            key={key}
            className="text-text-04 text-body-m-16 flex w-64 items-center justify-center text-center md:w-120 lg:w-180"
          >
            <span className="whitespace-pre-line">{TIME_LABELS[key]}</span>
          </div>
        ))}
      </div>

      {/* 행: 요일 + 히트맵 */}
      <div className="flex flex-col gap-y-4">
        {data.days.map((day, rowIndex) => (
          <div key={day.date} className="flex items-center gap-x-16">
            {/* 요일 라벨 */}
            <div className="text-text-04 text-body-m-16 flex h-36 items-center justify-center">
              {DAY_LABELS[rowIndex]}
            </div>

            {/* 시간대별 HeatmapCell */}
            <div className="flex gap-x-4">
              {timeKeys.map(key => {
                const slot = day.time_slots[key];
                return <HeatmapCell key={key} minutes={slot.minutes} intensity={slot.intensity} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyHeatmap;
