import { TabItem } from '@/components/ui/Tab';
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

// 주간 히트맵 범례
export const WEEKLY_LEGEND = [
  { intensity: 0, label: '0-1시간', bgClass: 'bg-heatmap-0' },
  { intensity: 1, label: '1-2시간', bgClass: 'bg-heatmap-1' },
  { intensity: 2, label: '2-3시간', bgClass: 'bg-heatmap-2' },
  { intensity: 3, label: '3-4시간', bgClass: 'bg-heatmap-3' },
  { intensity: 4, label: '4시간+', bgClass: 'bg-heatmap-4' },
];

// 월간 히트맵 범례
export const MONTHLY_LEGEND = [
  { intensity: 0, label: '0-7시간', bgClass: 'bg-heatmap-0' },
  { intensity: 1, label: '7-14시간', bgClass: 'bg-heatmap-1' },
  { intensity: 2, label: '14-21시간', bgClass: 'bg-heatmap-2' },
  { intensity: 3, label: '21-28시간', bgClass: 'bg-heatmap-3' },
  { intensity: 4, label: '28시간+', bgClass: 'bg-heatmap-4' },
];

// 히트맵 조회 기간 선택 탭 (주간 / 월간)
export const periodTabs: TabItem[] = [
  { id: 'week', label: '이번 주' },
  { id: 'month', label: '이번 달' },
];
