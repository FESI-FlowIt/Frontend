'use client';

import React, { useEffect, useRef, useState } from 'react';

import dayjs from 'dayjs';

import ArrowBack from '@/assets/ArrowBack.svg';
import ArrowForward from '@/assets/ArrowForward.svg';
import CalendarIcon from '@/assets/CalendarIcon.svg';
import { cn } from '@/lib/cn';

interface CustomCalendarProps {
  selected: Date | null;
  //eslint-disable-next-line no-unused-vars
  onChange: (date: Date | null) => void;
  error?: boolean;
  placeholder?: string;
  minDate?: Date;
  className?: string;
  allowKeyboardInput?: boolean; // 키보드 입력 허용 여부
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
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs(selected || new Date()));

  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 선택된 날짜가 변경될 때 input 값 업데이트
  useEffect(() => {
    if (selected && !isInputFocused) {
      setInputValue(dayjs(selected).format('YYYY-MM-DD'));
    } else if (!selected && !isInputFocused) {
      setInputValue('');
    }
  }, [selected, isInputFocused]);

  // 날짜 마스킹 함수
  const formatDateInput = (value: string) => {
    // 숫자만 추출
    const numbersOnly = value.replace(/\D/g, '');

    // 길이에 따라 형식 적용
    if (numbersOnly.length <= 4) {
      return numbersOnly;
    } else if (numbersOnly.length <= 6) {
      return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4)}`;
    } else {
      return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4, 6)}-${numbersOnly.slice(6, 8)}`;
    }
  };
  // 달력 그리드 생성
  const generateCalendarDays = () => {
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');
    const startOfCalendar = startOfMonth.startOf('week');
    const endOfCalendar = endOfMonth.endOf('week');

    const days = [];
    let current = startOfCalendar;

    while (current.isBefore(endOfCalendar) || current.isSame(endOfCalendar, 'day')) {
      days.push(current);
      current = current.add(1, 'day');
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDateClick = (date: dayjs.Dayjs) => {
    const jsDate = date.toDate();

    // 최소 날짜 체크
    if (minDate && date.isBefore(dayjs(minDate).startOf('day'))) {
      return;
    }

    onChange(jsDate);
  };

  const formatDisplayDate = (date: Date | null) => {
    if (!date) return '';
    return dayjs(date).format('YYYY년 MM월 DD일');
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => prev.subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => prev.add(1, 'month'));
  };

  // 키보드 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatDateInput(value);
    setInputValue(formattedValue);

    // 날짜 형식 검증 및 파싱
    if (value.length === 10) {
      // YYYY-MM-DD 형식
      const parsedDate = dayjs(value, 'YYYY-MM-DD', true);

      if (parsedDate.isValid()) {
        // 최소 날짜 체크
        if (!minDate || !parsedDate.isBefore(dayjs(minDate).startOf('day'))) {
          onChange(parsedDate.toDate());
          setCurrentMonth(parsedDate);
        }
      }
    }
  };

  // 입력 필드 포커스 처리
  const handleInputFocus = () => {
    setIsInputFocused(true);
    if (allowKeyboardInput) {
      setIsOpen(false); // 키보드 입력 시 달력 닫기
    }
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);

    // 입력값이 유효하지 않으면 원래 값으로 복원
    if (inputValue && !dayjs(inputValue, 'YYYY-MM-DD', true).isValid()) {
      if (selected) {
        setInputValue(dayjs(selected).format('YYYY-MM-DD'));
      } else {
        setInputValue('');
      }
    }
  };

  // 키보드 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 백스페이스와 Delete는 허용
    if (e.key === 'Backspace' || e.key === 'Delete') {
      return;
    }

    // 숫자와 특정 키만 허용
    if (
      !/[0-9]/.test(e.key) &&
      !['Enter', 'Escape', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
    ) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown' && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  // 달력 아이콘 클릭 처리
  const handleCalendarIconClick = () => {
    setIsOpen(!isOpen);
  };

  // 컨테이너 클릭 처리
  const handleContainerClick = () => {
    if (allowKeyboardInput) {
      inputRef.current?.focus();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      {/* 입력 필드 */}
      <div
        onClick={handleContainerClick}
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
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
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
        onClick={handleCalendarIconClick}
      >
        <CalendarIcon className="h-20 w-20 text-gray-400" />
      </div>

      {/* 달력 드롭다운 */}
      {isOpen && (
        <>
          {/* 오버레이 */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* 달력 컨테이너 */}
          <div className="absolute top-full right-0 z-50 mt-16 flex min-h-360 w-400 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            {/* 헤더 */}
            <div className="flex h-48 items-center justify-center pt-36 pb-24">
              <button
                type="button"
                onClick={goToPreviousMonth}
                className="mr-8 flex h-24 w-24 cursor-pointer items-center justify-center hover:bg-gray-100"
              >
                <ArrowBack className="text-snackbar" />
              </button>

              <span className="text-body-sb-20 text-text-02">
                {currentMonth.format('YYYY년 MM월')}
              </span>

              <button
                type="button"
                onClick={goToNextMonth}
                className="ml-8 flex h-24 w-24 cursor-pointer items-center justify-center hover:bg-gray-100"
              >
                <ArrowForward className="text-snackbar" />
              </button>
            </div>

            {/* 달력 본문 */}
            <div className="flex-1 px-12 pb-36">
              {/* 요일 헤더 */}
              <div className="mb-8 grid grid-cols-7 gap-2">
                {weekdays.map(day => (
                  <div
                    key={day}
                    className="text-text-04 flex h-44 w-full items-center justify-center"
                  >
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
                      onClick={() => handleDateClick(date)}
                      disabled={isDisabled}
                      className={cn(
                        'text-body-m-16 text-text-03 mx-9.5 mt-4 mb-12 flex h-28 w-28 items-center justify-center rounded-full transition-colors duration-200',
                        {
                          // 비활성화된 날짜
                          'text-text-04 cursor-not-allowed': isDisabled,

                          // 호버 효과 (선택 가능한 날짜)
                          'cursor-pointer hover:bg-gray-100': !isSelected && !isDisabled,

                          // 오늘 날짜
                          'ring-line ring-1': isToday && !isSelected && !isDisabled,

                          // 선택된 날짜
                          'bg-primary-01 text-text-00 cursor-pointer': isSelected,
                        },
                      )}
                    >
                      {date.date()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomCalendar;
