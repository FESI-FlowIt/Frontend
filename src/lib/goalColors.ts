import {
  CSS_VAR_TO_GOAL_COLOR_MAP,
  GOAL_BACKGROUND_COLOR_CLASS_MAP,
  GOAL_BORDER_COLOR_CLASS_MAP,
  GOAL_COLOR_HEX_MAP,
  GOAL_TEXT_COLOR_CLASS_MAP,
  GoalColor,
  HEX_TO_GOAL_COLOR_MAP,
} from '@/constants/goalColors';

// 색상 정규화 함수
const normalizeColorName = (colorInput: string): GoalColor | null => {
  const input = colorInput.toLowerCase().trim();

  // 1. 이미 GoalColor 형태인 경우
  if (input in GOAL_BACKGROUND_COLOR_CLASS_MAP) {
    return input as GoalColor;
  }

  // 2. CSS 변수 형태인 경우
  if (input.startsWith('--color-goal-')) {
    return CSS_VAR_TO_GOAL_COLOR_MAP[input] || null;
  }

  // 3. HEX 코드인 경우
  if (input.startsWith('#')) {
    return HEX_TO_GOAL_COLOR_MAP[input] || null;
  }

  return null;
};

// HEX 코드 가져오기
export const getGoalColorHex = (colorInput: string): string => {
  const color = normalizeColorName(colorInput);
  return color ? GOAL_COLOR_HEX_MAP[color] : '#515660';
};

// 배경 클래스 가져오기
export const getGoalBackgroundColorClass = (colorInput: string): string => {
  const color = normalizeColorName(colorInput);
  return color ? GOAL_BACKGROUND_COLOR_CLASS_MAP[color] : 'bg-disable';
};

// 텍스트 클래스 가져오기
export const getGoalTextColorClass = (colorInput: string): string => {
  const color = normalizeColorName(colorInput);
  return color ? GOAL_TEXT_COLOR_CLASS_MAP[color] : 'text-disable';
};

// 테두리 클래스 가져오기
export const getGoalBorderColorClass = (colorInput: string): string => {
  const color = normalizeColorName(colorInput);
  return color ? GOAL_BORDER_COLOR_CLASS_MAP[color] : 'border-disable';
};

// HEX를 GoalColor로 변환
export const hexToGoalColor = (hexColor: string): GoalColor | null => {
  return HEX_TO_GOAL_COLOR_MAP[hexColor.toLowerCase()] || null;
};
