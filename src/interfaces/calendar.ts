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
