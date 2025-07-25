'use client';

import React from 'react';

import dayjs from 'dayjs';

import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';

interface CalendarDropdownProps {
  isOpen: boolean;
  selected: Date | null;
  currentMonth: dayjs.Dayjs;
  minDate?: Date;
  calendarDays: dayjs.Dayjs[];
  onClose: () => void;
  //eslint-disable-next-line no-unused-vars
  onDateClick: (date: dayjs.Dayjs) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const CalendarDropdown: React.FC<CalendarDropdownProps> = ({
  isOpen,
  selected,
  currentMonth,
  minDate,
  calendarDays,
  onClose,
  onDateClick,
  onPreviousMonth,
  onNextMonth,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* 달력 컨테이너 */}
      <div className="absolute top-full right-0 z-50 mt-16 flex min-h-360 w-400 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
        <CalendarHeader
          currentMonth={currentMonth}
          onPreviousMonth={onPreviousMonth}
          onNextMonth={onNextMonth}
        />
        <CalendarGrid
          calendarDays={calendarDays}
          selected={selected}
          minDate={minDate}
          onDateClick={onDateClick}
        />
      </div>
    </>
  );
};

export default CalendarDropdown;
