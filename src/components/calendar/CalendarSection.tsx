import { useRef, useState } from 'react';

import CalendarFilledIcon from '@/assets/icons/calendar-filled.svg';
import CalendarGoalPopover from '@/components/calendar/CalendarGoalPopover';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import ArrowNavigation from '@/components/ui/ArrowNavigation';
import Card from '@/components/ui/Card';
import { useDeadlineCalendar } from '@/hooks/useGoalCalendar';
import usePopover from '@/hooks/usePopover';
import { Goal } from '@/interfaces/calendar';

export default function CalendarSection() {
  const [selectedMonth, setSelectedMonth] = useState('2025-07');
  const { data: calendarData } = useDeadlineCalendar(selectedMonth);

  const [year, month] = selectedMonth.split('-').map(Number);

  // Refs
  const calendarGridRef = useRef<HTMLDivElement>(null);

  // Popover 관리 (Hook 사용)
  const popover = usePopover();

  // 팝오버 상태 관리
  const [selectedGoals, setSelectedGoals] = useState<{
    date: number;
    goals: Goal[];
  }>({
    date: 0,
    goals: [],
  });

  // 위치 계산 로직 (기존과 동일하게 유지)
  const calculatePopoverPosition = (cellElement: HTMLElement) => {
    if (!calendarGridRef.current) return { top: 0, left: 0 };

    const cellRect = cellElement.getBoundingClientRect();
    const gridRect = calendarGridRef.current.getBoundingClientRect();

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // 팝오버 크기
    const popoverWidth = window.innerWidth >= 744 ? 520 : 343;

    // CalendarGrid의 중앙 X 좌표 계산
    const gridCenterX = gridRect.left + gridRect.width / 2;

    // 팝오버의 중앙이 Grid의 중앙과 일치하도록 위치 계산
    const popoverLeft = scrollLeft + gridCenterX - popoverWidth / 2;

    // 세로 위치: 클릭한 셀 아래 8px
    const popoverTop = scrollTop + cellRect.bottom + 8;

    return { top: popoverTop, left: popoverLeft };
  };

  // 이전 달로 이동
  const handlePrevMonth = () => {
    const currentDate = new Date(year, month - 1);
    currentDate.setMonth(currentDate.getMonth() - 1);

    const newYear = currentDate.getFullYear();
    const newMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    setSelectedMonth(`${newYear}-${newMonth}`);

    popover.close();
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    const currentDate = new Date(year, month - 1);
    currentDate.setMonth(currentDate.getMonth() + 1);

    const newYear = currentDate.getFullYear();
    const newMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    setSelectedMonth(`${newYear}-${newMonth}`);

    popover.close();
  };

  // 셀 클릭 핸들러
  const handleCellClick = (date: number, goals: Goal[], event: React.MouseEvent) => {
    if (goals.length === 0) return;

    const target = event.currentTarget as HTMLElement;
    const position = calculatePopoverPosition(target);

    setSelectedGoals({ date, goals });
    popover.open(position);
  };

  // selectedMonth 기반으로 기본값 생성
  const displayData = calendarData?.data || {
    month: selectedMonth,
    goals: [],
  };

  return (
    <div>
      <Card
        icon={
          <CalendarFilledIcon className="text-gray-01" width={24} height={24} fill="currentColor" />
        }
        title="마감일 캘린더"
        extra={
          <ArrowNavigation
            label={`${year}년 ${month}월`}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
            isDisabledPrev={false}
            isDisabledNext={false}
          />
        }
        backgroundColor="white"
        size="calendar"
        flexWrapExtra={false}
      >
        <CalendarGrid ref={calendarGridRef} data={displayData} onCellClick={handleCellClick} />
      </Card>

      {/* 목표 팝오버 */}
      <CalendarGoalPopover
        month={month}
        date={selectedGoals.date}
        goals={selectedGoals.goals}
        position={popover.position}
        onClose={popover.close}
        isOpen={popover.isOpen}
      />
    </div>
  );
}
