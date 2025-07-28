'use client';

import React from 'react';

import CalendarIcon from '@/../public/assets/icons/calendarIcon.svg';
import { formatDisplayDate } from '@/lib/calendarUtils';
import { cn } from '@/lib/cn';

interface CalendarInputProps {
  selected: Date | null;
  error?: boolean;
  placeholder?: string;
  className?: string;
  allowKeyboardInput?: boolean;
  inputValue: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onContainerClick: () => void;
  onCalendarIconClick: () => void;
  //eslint-disable-next-line no-unused-vars
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputFocus: () => void;
  onInputBlur: () => void;
  //eslint-disable-next-line no-unused-vars
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  selected,
  error = false,
  placeholder = '날짜를 선택하세요',
  className = '',
  allowKeyboardInput = true,
  inputValue,
  inputRef,
  onContainerClick,
  onCalendarIconClick,
  onInputChange,
  onInputFocus,
  onInputBlur,
  onKeyDown,
}) => {
  return (
    <>
      {/* 입력 필드 */}
      <div
        onClick={onContainerClick}
        className={cn(
          'text-body-m-16 h-44 w-full cursor-pointer rounded-lg border py-10 pr-50 pl-20',
          'transition-colors focus-within:ring-2 focus-within:outline-none',
          error
            ? 'focus-within:ring-error focus-within:border-error'
            : 'focus-within:ring-primary-01-hover focus-within:border-primary-01-hover',
          allowKeyboardInput ? 'cursor-text' : 'cursor-pointer',
          className,
        )}
      >
        {allowKeyboardInput ? (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={onInputChange}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            onKeyDown={onKeyDown}
            placeholder="YYYY-MM-DD"
            className="w-full bg-transparent outline-none"
            maxLength={10}
          />
        ) : (
          <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
            {selected ? formatDisplayDate(selected) : placeholder}
          </span>
        )}
      </div>

      {/* 달력 아이콘 */}
      <div
        className="absolute top-1/2 right-16 -translate-y-1/2 transform cursor-pointer"
        onClick={onCalendarIconClick}
      >
        <CalendarIcon className="h-20 w-20 text-gray-400" />
      </div>
    </>
  );
};

export default CalendarInput;
