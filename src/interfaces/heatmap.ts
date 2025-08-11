// 히트맵 셀의 작업 시간 강도
export type HeatmapIntensity = 0 | 1 | 2 | 3 | 4;

// 작업 시간대
export type TimeSlotKey = 'dawn' | 'morning' | 'afternoon' | 'evening';

// 각 시간대의 작업 시간 정보
export interface TimeSlot {
  minutes: number; // 분
  intensity: HeatmapIntensity; // 강도
}

// 하루 단위 히트맵 데이터
export interface DayData {
  date: string;
  time_slots: Record<TimeSlotKey, TimeSlot>;
}

// 주간 히트맵 응답 데이터 형식
export interface WeeklyHeatmapResponse {
  success: boolean;
  data: {
    days: {
      date: string;
      time_slots: Record<TimeSlotKey, { minutes: number; intensity: number }>;
    }[];
  };
}

// 월간 히트맵 응답 데이터 형식
export interface MonthlyHeatmapResponse {
  success: boolean;
  data: {
    month: string;
    days: {
      week_of_month: number;
      time_slots: Record<TimeSlotKey, { minutes: number; intensity: number }>;
    }[];
  };
}

// API 명세서 기반 응답 타입
export interface ApiMonthlyHeatmapResponse {
  code: string;
  message: string;
  result: {
    yearMonth: string;
    weeklyHeatmaps: {
      weekOfMonth: number;
      timeSlots: Record<TimeSlotKey, { minutes: number; intensity: number }>;
    }[];
  };
}
