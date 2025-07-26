import { useState } from 'react';

import Image from 'next/image';

import CalendarGrid from '@/components/calendar/CalendarGrid';
import ArrowNavigation from '@/components/ui/ArrowNavigation';
import Card from '@/components/ui/Card';
import { useDeadlineCalendar } from '@/hooks/useGoalCalendar';

export default function CalendarSection() {
  const [selectedMonth, setSelectedMonth] = useState('2025-07');
  const { data: calendarData } = useDeadlineCalendar(selectedMonth);

  const [year, month] = selectedMonth.split('-').map(Number);

  // 이전 달로 이동
  const handlePrevMonth = () => {
    const currentDate = new Date(year, month - 1);
    currentDate.setMonth(currentDate.getMonth() - 1);

    const newYear = currentDate.getFullYear();
    const newMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    setSelectedMonth(`${newYear}-${newMonth}`);
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    const currentDate = new Date(year, month - 1);
    currentDate.setMonth(currentDate.getMonth() + 1);

    const newYear = currentDate.getFullYear();
    const newMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    setSelectedMonth(`${newYear}-${newMonth}`);
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
          <Image
            src="/assets/icons/calendarIcon.svg"
            alt="달력 아이콘"
            width={24}
            height={24}
            className="h-full w-full object-contain"
          />
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
        <CalendarGrid data={displayData} />
      </Card>
    </div>
  );
}
