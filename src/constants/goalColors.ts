export type GoalColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink';

// 기본 색상 정의
const GOAL_COLORS = {
  red: {
    hex: '#ff6b6b',
    cssVar: '--color-goal-red',
  },
  orange: {
    hex: '#ffa94d',
    cssVar: '--color-goal-orange',
  },
  yellow: {
    hex: '#ffe17a',
    cssVar: '--color-goal-yellow',
  },
  green: {
    hex: '#5edc8d',
    cssVar: '--color-goal-green',
  },
  blue: {
    hex: '#3774f8',
    cssVar: '--color-goal-blue',
  },
  purple: {
    hex: '#9e80ff',
    cssVar: '--color-goal-purple',
  },
  pink: {
    hex: '#ff72b6',
    cssVar: '--color-goal-pink',
  },
} as const;

// 컬러 선택기용 옵션 (CSS 변수 형태)
export const GOAL_COLOR_OPTIONS = Object.fromEntries(
  Object.entries(GOAL_COLORS).map(([key, color]) => [key, color.cssVar]),
) as Record<GoalColor, string>;

// HEX 코드 매핑
export const GOAL_COLOR_HEX_MAP = Object.fromEntries(
  Object.entries(GOAL_COLORS).map(([key, color]) => [key, color.hex]),
) as Record<GoalColor, string>;

// Tailwind 클래스 매핑
export const GOAL_BACKGROUND_COLOR_CLASS_MAP = Object.fromEntries(
  Object.entries(GOAL_COLORS).map(([key]) => [key, `bg-goal-${key}`]),
) as Record<GoalColor, string>;

export const GOAL_TEXT_COLOR_CLASS_MAP = Object.fromEntries(
  Object.entries(GOAL_COLORS).map(([key]) => [key, `text-goal-${key}`]),
) as Record<GoalColor, string>;

export const GOAL_BORDER_COLOR_CLASS_MAP = Object.fromEntries(
  Object.entries(GOAL_COLORS).map(([key]) => [key, `border-goal-${key}`]),
) as Record<GoalColor, string>;

// 역방향 매핑 (HEX → GoalColor)
export const HEX_TO_GOAL_COLOR_MAP = Object.fromEntries(
  Object.entries(GOAL_COLORS).map(([key, color]) => [color.hex.toLowerCase(), key]),
) as Record<string, GoalColor>;

// CSS 변수 → GoalColor 매핑
export const CSS_VAR_TO_GOAL_COLOR_MAP = Object.fromEntries(
  Object.entries(GOAL_COLORS).map(([key, color]) => [color.cssVar, key]),
) as Record<string, GoalColor>;
