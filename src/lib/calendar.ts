import dayjs from 'dayjs';

import { Goal } from '@/interfaces/calendar';

// 목표를 생성일 기준으로 정렬 (최신순)
export const sortGoalsByCreatedAt = (goals: Goal[]): Goal[] => {
  return [...goals].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB.getTime() - dateA.getTime(); // 최신 생성일이 먼저 오도록
  });
};

// 목표 배열을 날짜별로 그룹핑하고 각 날짜의 목표들을 생성일 기준으로 정렬
export const groupGoalsByDate = (goals: Goal[]): Record<number, Goal[]> => {
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

  // 각 날짜의 목표들을 생성일 기준으로 정렬 (최신순)
  Object.keys(grouped).forEach(date => {
    grouped[Number(date)] = sortGoalsByCreatedAt(grouped[Number(date)]);
  });

  return grouped;
};

// 주어진 월의 캘린더 정보를 계산
export const getCalendarInfo = (month: string) => {
  const currentMonth = dayjs(month, 'YYYY-MM');
  const firstDay = currentMonth.startOf('month').day(); // 첫 날의 요일 (0: 일요일)
  const daysInMonth = currentMonth.daysInMonth(); // 해당 월의 총 일수

  return {
    currentMonth,
    firstDay,
    daysInMonth,
  };
};

// 현재 날짜를 YYYY-MM 형태로 반환하는 함수
export const getCurrentMonth = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};
