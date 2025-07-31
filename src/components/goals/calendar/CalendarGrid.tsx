'use client';

import React from 'react';

import dayjs from 'dayjs';

import { WEEKDAYS } from '@/lib/calendarUtils';
import { cn } from '@/lib/cn';

interface CalendarGridProps {
  calendarDays: dayjs.Dayjs[];
  selected: Date | null;
  minDate?: Date;
  //eslint-disable-next-line no-unused-vars
  onDateClick: (date: dayjs.Dayjs) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  calendarDays,
  selected,
  minDate,
  onDateClick,
}) => {
  return (
    <div className="flex-1 px-12 pb-36">
      {/* 요일 헤더 */}
      <div className="mb-8 grid grid-cols-7 gap-2">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-text-04 flex h-44 w-full items-center justify-center">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 place-items-center">
        {calendarDays.map((date, index) => {
          const isSelected = selected && date.isSame(dayjs(selected), 'day');
          const isToday = date.isSame(dayjs(), 'day');
          const isDisabled = minDate && date.isBefore(dayjs(minDate).startOf('day'));

          return (
            <button
              key={index}
              type="button"
              onClick={() => onDateClick(date)}
              disabled={isDisabled}
              className={cn(
                'text-body-m-16 text-text-03 mx-9.5 mt-4 mb-12 flex h-28 w-28 items-center justify-center rounded-full transition-colors duration-200',
                {
                  // 비활성화된 날짜
                  'text-text-04 cursor-not-allowed': isDisabled,

                  // 호버 효과 (선택 가능한 날짜)
                  'cursor-pointer': !isSelected && !isDisabled,

                  // 오늘 날짜
                  'ring-line ring-1': isToday && !isSelected && !isDisabled,

                  // 선택된 날짜
                  'bg-primary-01 cursor-pointer text-black': isSelected,
                },
              )}
            >
              {date.date()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
