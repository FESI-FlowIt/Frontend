import { GoalColor } from '@/interfaces/goal';

// 목표 색상 매핑
export const GOAL_COLOR_MAP: Record<GoalColor, string> = {
  orange: 'bg-goal-orange',
  red: 'bg-goal-red',
  green: 'bg-goal-green',
  yellow: 'bg-goal-yellow',
  pink: 'bg-goal-pink',
  blue: 'bg-goal-blue',
  purple: 'bg-goal-purple',
} as const;

// 목표 색상 HEX 코드 매핑 (SVG 아이콘 등에 사용)
export const GOAL_COLOR_HEX_MAP: Record<GoalColor, string> = {
  orange: '#FF8C00',
  red: '#FF4444',
  green: '#4CAF50',
  yellow: '#FFEB3B',
  pink: '#E91E63',
  blue: '#2196F3',
  purple: '#9C27B0',
} as const;

// 목표 text 색상 매핑 (아이콘 등에 사용)
export const GOAL_TEXT_COLOR_MAP: Record<GoalColor, string> = {
  orange: 'text-goal-orange',
  red: 'text-goal-red',
  green: 'text-goal-green',
  yellow: 'text-goal-yellow',
  pink: 'text-goal-pink',
  blue: 'text-goal-blue',
  purple: 'text-goal-purple',
} as const;

export const getGoalColorClass = (colorName: string): string => {
  return GOAL_COLOR_MAP[colorName as GoalColor] || 'bg-gray-400';
};

export const getGoalColorHex = (colorName: string): string => {
  return GOAL_COLOR_HEX_MAP[colorName as GoalColor] || '#9CA3AF';
};

export const getGoalTextColorClass = (colorName: string): string => {
  return GOAL_TEXT_COLOR_MAP[colorName as GoalColor] || 'text-gray-400';
};

// 유효한 GoalColor인지 확인하는 타입 가드
export const isValidGoalColor = (colorName: string): colorName is GoalColor => {
  return colorName in GOAL_COLOR_MAP;
};
