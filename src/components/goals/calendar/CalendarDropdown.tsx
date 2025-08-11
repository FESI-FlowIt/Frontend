'use client';

import React, { useEffect, useRef, useState } from 'react';

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    right?: number | string;
    left?: number | string;
    transform?: string;
  }>({ right: 0, left: 'auto' });

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const parentElement = dropdownRef.current?.parentElement;
      if (!parentElement) return;

      const parentRect = parentElement.getBoundingClientRect();
      const calendarWidth = 400; // w-400 = 400px
      const calendarHeight = 360; // min-h-360 = 360px
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const margin = 16; // 여백

      // 현재 위치에서 캘린더가 화면을 벗어나는지 확인
      const inputBottom = parentRect.bottom + 16; // mt-16
      const wouldOverflowBottom = inputBottom + calendarHeight > viewportHeight - margin;
      const wouldOverflowRight = parentRect.right > viewportWidth - calendarWidth - margin;
      const wouldOverflowLeft = parentRect.left + calendarWidth > viewportWidth - margin;

      let newPosition: typeof position = { right: 0, left: 'auto' };

      // 아래쪽 공간이 부족하면 위쪽에 표시
      if (wouldOverflowBottom && parentRect.top - calendarHeight - 16 > margin) {
        // 위쪽에 충분한 공간이 있으면 위로 표시
        newPosition.transform = 'translateY(-100%) translateY(-16px)';
      }

      // 가로 위치 조정
      if (wouldOverflowRight && !wouldOverflowLeft) {
        // 오른쪽으로 넘치면 왼쪽 정렬
        newPosition = { ...newPosition, right: 'auto', left: 0 };
      } else if (wouldOverflowRight && wouldOverflowLeft) {
        // 양쪽 다 넘치면 화면 중앙에 맞춰서 표시
        const centerOffset = (viewportWidth - calendarWidth) / 2 - parentRect.left;
        newPosition = { ...newPosition, right: 'auto', left: centerOffset };
      }

      setPosition(newPosition);
    };

    // DOM이 렌더링된 후 위치 계산
    const timeoutId = setTimeout(updatePosition, 10);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* 달력 컨테이너 */}
      <div
        ref={dropdownRef}
        className="absolute top-full right-0 z-50 mt-16 flex min-h-360 w-400 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
        style={{
          right: position.right,
          left: position.left,
          transform: position.transform,
        }}
      >
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
