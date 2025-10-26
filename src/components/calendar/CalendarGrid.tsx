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
  const TOTAL_CELLS = 42;

  // 이전 달의 날짜 계산
  const today = new Date();
  const [currentYear, currentMonth] = data.month.split('-').map(Number);

  const prevMonth = new Date(currentYear, currentMonth - 1, 0);
  const prevMonthDays = prevMonth.getDate();

  for (let i = 0; i < firstDay; i++) {
    const date = prevMonthDays - firstDay + i + 1;
    calendarCells.push(<CalendarCell key={`prev-${date}`} date={date} isCurrentMonth={false} />);
  }

  for (let date = 1; date <= daysInMonth; date++) {
    const goalsOfTheDay = groupedGoals[date] || [];
    const isToday =
      today.getDate() === date &&
      today.getMonth() + 1 === currentMonth &&
      today.getFullYear() === currentYear;

    calendarCells.push(
      <CalendarCell
        key={date}
        date={date}
        goals={goalsOfTheDay}
        onClick={onCellClick}
        isCurrentMonth={true}
        isToday={isToday}
      />,
    );
  }

  // 다음 달의 날짜 계산
  let nextMonthDate = 1;
  const remainingCells = TOTAL_CELLS - (firstDay + daysInMonth);
  for (let i = 0; i < remainingCells; i++) {
    calendarCells.push(
      <CalendarCell key={`next-${nextMonthDate}`} date={nextMonthDate++} isCurrentMonth={false} />,
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
