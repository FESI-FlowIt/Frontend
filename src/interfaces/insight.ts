// 주간 인사이트 응답 데이터 형식
export interface WeeklyInsightResponse {
  success: boolean;
  data: {
    week_start: string;
    week_end: string;
    insights: string[];
  };
}

// 월간 인사이트 응답 데이터 형식
export interface MonthlyInsightResponse {
  success: boolean;
  data: {
    month: string;
    month_name: string;
    insights: string[];
  };
}
