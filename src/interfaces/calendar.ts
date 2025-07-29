export interface Goal {
  id: string;
  title: string;
  due_date: string;
  color: string;
  created_at: string;
}

export interface CalendarData {
  month: string;
  goals: Goal[];
}

export interface CalendarResponse {
  success: boolean;
  data: CalendarData;
}

export const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

// API 명세서 기반 응답 타입
export interface ApiGoal {
  id: string;
  name: string;
  color: string;
  createdDateTime: string;
  dueDateTime: string;
}

export interface ApiCalendarData {
  date: string;
  goals: ApiGoal[];
}

export interface ApiCalendarResponse {
  code: string;
  message: string;
  result: ApiCalendarData;
}
