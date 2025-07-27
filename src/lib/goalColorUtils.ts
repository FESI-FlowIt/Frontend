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

// 목표 테두리 색상 매핑
export const GOAL_BORDER_COLOR_MAP: Record<GoalColor, string> = {
  orange: 'border-goal-orange',
  red: 'border-goal-red',
  green: 'border-goal-green',
  yellow: 'border-goal-yellow',
  pink: 'border-goal-pink',
  blue: 'border-goal-blue',
  purple: 'border-goal-purple',
} as const;

// CSS 변수 형태의 색상값을 GoalColor로 변환하는 함수
const normalizeColorName = (colorName: string): string => {
  // CSS 변수 형태인 경우 (예: --color-goal-blue -> blue)
  if (colorName.startsWith('--color-goal-')) {
    return colorName.replace('--color-goal-', '');
  }

  // HEX 코드인 경우 매핑 테이블에서 찾기
  if (colorName.startsWith('#')) {
    const matchedColor = Object.entries(GOAL_COLOR_HEX_MAP).find(
      ([, hex]) => hex.toLowerCase() === colorName.toLowerCase(),
    );
    return matchedColor ? matchedColor[0] : colorName;
  }

  // 이미 올바른 형태인 경우 그대로 반환
  return colorName;
};

export const getGoalColorClass = (colorName: string): string => {
  const normalizedColor = normalizeColorName(colorName);
  return GOAL_COLOR_MAP[normalizedColor as GoalColor] || 'bg-gray-400';
};

export const getGoalColorHex = (colorName: string): string => {
  const normalizedColor = normalizeColorName(colorName);
  return GOAL_COLOR_HEX_MAP[normalizedColor as GoalColor] || '#9CA3AF';
};

export const getGoalTextColorClass = (colorName: string): string => {
  const normalizedColor = normalizeColorName(colorName);
  return GOAL_TEXT_COLOR_MAP[normalizedColor as GoalColor] || 'text-gray-400';
};

export const getGoalBorderColorClass = (colorName: string): string => {
  const normalizedColor = normalizeColorName(colorName);
  return GOAL_BORDER_COLOR_MAP[normalizedColor as GoalColor] || 'border-gray-400';
};

// 유효한 GoalColor인지 확인하는 타입 가드
export const isValidGoalColor = (colorName: string): colorName is GoalColor => {
  const normalizedColor = normalizeColorName(colorName);
  return normalizedColor in GOAL_COLOR_MAP;
};
