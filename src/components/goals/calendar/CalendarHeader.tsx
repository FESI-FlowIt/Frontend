'use client';

import React from 'react';

import dayjs from 'dayjs';

import ArrowBackIcon from '@/assets/icons/arrow-left.svg';
import ArrowForwardIcon from '@/assets/icons/arrow-right.svg';

interface CalendarHeaderProps {
  currentMonth: dayjs.Dayjs;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
}) => {
  return (
    <div className="flex h-48 items-center justify-center pt-36 pb-24">
      <button
        type="button"
        onClick={onPreviousMonth}
        className="mr-8 flex h-24 w-24 cursor-pointer items-center justify-center hover:bg-gray-100"
      >
        <ArrowBackIcon className="text-gray-01" width={24} height={24} />
      </button>

      <span className="text-body-sb-20 text-text-02">{currentMonth.format('YYYY년 MM월')}</span>

      <button
        type="button"
        onClick={onNextMonth}
        className="ml-8 flex h-24 w-24 cursor-pointer items-center justify-center hover:bg-gray-100"
      >
        <ArrowForwardIcon className="text-gray-01" width={24} height={24} />
      </button>
    </div>
  );
};

export default CalendarHeader;
