import { TimeSlotKey } from '@/interfaces/heatmap';

// 요일 라벨 (일주일 기준, 월요일 시작)
export const WEEKDAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

// 주차 라벨 (6주 기준)
export const WEEK_ORDER_LABELS = ['1주', '2주', '3주', '4주', '5주', '6주'];

// 시간대 라벨 (히트맵 열 헤더용, 시간 범위 포함)
export const TIME_LABELS: Record<TimeSlotKey, string> = {
  dawn: '새벽\n00-06',
  morning: '오전\n06-12',
  afternoon: '오후\n12-18',
  evening: '밤\n18-24',
};
