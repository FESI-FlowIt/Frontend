import { forwardRef } from 'react';

import CalendarCell from '@/components/calendar/CalendarCell';
import { useCalendarData } from '@/hooks/useGoalCalendar';
import { CalendarData, DAYS, Goal } from '@/interfaces/calendar';

interface CalendarGridProps {
  data: CalendarData;
  onCellClick?: (date: number, goals: Goal[], event: React.MouseEvent) => void;
}

const CalendarGrid = forwardRef<HTMLDivElement, CalendarGridProps>(({ data, onCellClick }, ref) => {
  const { firstDay, daysInMonth, groupedGoals } = useCalendarData(data);
  const calendarCells = [];

  // 빈 셀 채우기 (월 시작 전 빈 공간)
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(<div key={`empty-${i}`} />);
  }

  // 날짜 셀 채우기
  for (let date = 1; date <= daysInMonth; date++) {
    const goalsOfTheDay = groupedGoals[date] || [];

    calendarCells.push(
      <CalendarCell key={date} date={date} goals={goalsOfTheDay} onClick={onCellClick} />,
    );
  }

  return (
    <div ref={ref} className="w-full">
      {/* 요일 헤더 */}
      <div className="text-body-m-16 text-text-04 grid w-full grid-cols-7 text-center">
        {DAYS.map(day => (
          <span
            key={day}
            className="flex h-40 w-full min-w-40 items-center justify-center md:max-w-84 lg:h-20 lg:w-71"
          >
            {day}
          </span>
        ))}
      </div>
      {/* 캘린더 그리드 */}
      <div className="grid w-full auto-rows-fr grid-cols-7 gap-2 lg:gap-0">{calendarCells}</div>
    </div>
  );
});

CalendarGrid.displayName = 'CalendarGrid';

export default CalendarGrid;
