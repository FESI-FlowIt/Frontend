'use client';

import React from 'react';

import { useCalendar } from '@/hooks/useCalendar';

import CalendarDropdown from './CalendarDropdown';
import CalendarInput from './CalendarInput';

interface CustomCalendarProps {
  selected: Date | null;
  //eslint-disable-next-line no-unused-vars
  onChange: (date: Date | null) => void;
  error?: boolean;
  placeholder?: string;
  minDate?: Date;
  className?: string;
  allowKeyboardInput?: boolean;
}

const CustomCalendar = ({
  selected,
  onChange,
  error = false,
  placeholder = '날짜를 선택하세요',
  minDate = new Date(),
  className = '',
  allowKeyboardInput = true,
}: CustomCalendarProps) => {
  const {
    isOpen,
    setIsOpen,
    currentMonth,
    inputValue,
    inputRef,
    generateCalendarDays,
    handleDateClick,
    goToPreviousMonth,
    goToNextMonth,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleKeyDown,
    handleCalendarIconClick,
    handleContainerClick,
  } = useCalendar({
    selected,
    onChange,
    minDate,
    allowKeyboardInput,
  });

  const calendarDays = generateCalendarDays();

  return (
    <div className="relative">
      <CalendarInput
        selected={selected}
        error={error}
        placeholder={placeholder}
        className={className}
        allowKeyboardInput={allowKeyboardInput}
        inputValue={inputValue}
        inputRef={inputRef}
        onContainerClick={handleContainerClick}
        onCalendarIconClick={handleCalendarIconClick}
        onInputChange={handleInputChange}
        onInputFocus={handleInputFocus}
        onInputBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
      />

      <CalendarDropdown
        isOpen={isOpen}
        selected={selected}
        currentMonth={currentMonth}
        minDate={minDate}
        calendarDays={calendarDays}
        onClose={() => setIsOpen(false)}
        onDateClick={handleDateClick}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
      />
    </div>
  );
};

export default CustomCalendar;
