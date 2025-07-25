import dayjs from 'dayjs';

import { Goal } from '@/interfaces/calendar';

// 목표 배열을 날짜별로 그룹핑
export function groupGoalsByDate(goals: Goal[]): Record<number, Goal[]> {
  const grouped: Record<number, Goal[]> = {};

  if (!Array.isArray(goals)) {
    return grouped;
  }

  goals.forEach(goal => {
    const dueDate = dayjs(goal.due_date);
    const date = dueDate.date();

    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(goal);
  });

  return grouped;
}

// 주어진 월의 캘린더 정보를 계산
export function getCalendarInfo(month: string) {
  const currentMonth = dayjs(month, 'YYYY-MM');
  const firstDay = currentMonth.startOf('month').day(); // 첫 날의 요일 (0: 일요일)
  const daysInMonth = currentMonth.daysInMonth(); // 해당 월의 총 일수

  return {
    currentMonth,
    firstDay,
    daysInMonth,
  };
}
