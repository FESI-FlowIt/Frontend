'use client';

import { TIME_LABELS, WEEK_ORDER_LABELS } from '@/constants/heatmap';
import { TimeSlotKey, WeeklyHeatmapResponse } from '@/interfaces/heatmap';

import HeatmapCell from './HeatmapCell';

interface MonthlyHeatmapProps {
  data: WeeklyHeatmapResponse['data'];
}

const MonthlyHeatmap = ({ data }: MonthlyHeatmapProps) => {
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
              {WEEK_ORDER_LABELS[rowIndex]}
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

export default MonthlyHeatmap;
