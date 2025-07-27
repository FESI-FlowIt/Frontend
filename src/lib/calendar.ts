import dayjs from 'dayjs';

import { Goal } from '@/interfaces/calendar';
import { GoalColor } from '@/interfaces/goal';

// 목표를 생성일 기준으로 정렬 (최신순)
export function sortGoalsByCreatedAt(goals: Goal[]): Goal[] {
  return [...goals].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB.getTime() - dateA.getTime(); // 최신 생성일이 먼저 오도록
  });
}

// 목표 배열을 날짜별로 그룹핑하고 각 날짜의 목표들을 생성일 기준으로 정렬
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

  // 각 날짜의 목표들을 생성일 기준으로 정렬 (최신순)
  Object.keys(grouped).forEach(date => {
    grouped[Number(date)] = sortGoalsByCreatedAt(grouped[Number(date)]);
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

// HEX 코드를 색상 이름으로 매핑
export const HEX_TO_GOAL_COLOR_MAP: Record<string, GoalColor> = {
  '#FF6B6B': 'red',
  '#FFA94D': 'orange',
  '#FFE17A': 'yellow',
  '#5EDC8D': 'green',
  '#3774F8': 'blue',
  '#9E80FF': 'purple',
  '#FF72B6': 'pink',
} as const;

// HEX 코드를 받아서 GoalColor로 변환하는 함수
export const hexToGoalColor = (hexColor: string) => {
  const normalizedHex = hexColor.toUpperCase();
  const matchedColor = HEX_TO_GOAL_COLOR_MAP[normalizedHex];

  return matchedColor;
};
