import { useEffect, useRef, useState } from 'react';

import dayjs from 'dayjs';

interface UseCalendarProps {
  selected: Date | null;
  //eslint-disable-next-line no-unused-vars
  onChange: (date: Date | null) => void;
  minDate?: Date;
  allowKeyboardInput?: boolean;
}

export const useCalendar = ({
  selected,
  onChange,
  minDate,
  allowKeyboardInput = true,
}: UseCalendarProps) => {
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
    const numbersOnly = value.replace(/\D/g, '');

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

  const handleDateClick = (date: dayjs.Dayjs) => {
    const jsDate = date.toDate();

    // 최소 날짜 체크
    if (minDate && date.isBefore(dayjs(minDate).startOf('day'))) {
      return;
    }

    onChange(jsDate);
    setIsOpen(false);
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
      const parsedDate = dayjs(value, 'YYYY-MM-DD', true);

      if (parsedDate.isValid()) {
        if (!minDate || !parsedDate.isBefore(dayjs(minDate).startOf('day'))) {
          onChange(parsedDate.toDate());
          setCurrentMonth(parsedDate);
        }
      }
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    if (allowKeyboardInput) {
      setIsOpen(false);
    }
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);

    if (inputValue && !dayjs(inputValue, 'YYYY-MM-DD', true).isValid()) {
      if (selected) {
        setInputValue(dayjs(selected).format('YYYY-MM-DD'));
      } else {
        setInputValue('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      return;
    }

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

  const handleCalendarIconClick = () => {
    setIsOpen(!isOpen);
  };

  const handleContainerClick = () => {
    if (allowKeyboardInput) {
      inputRef.current?.focus();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return {
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
  };
};
