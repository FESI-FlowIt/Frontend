// API 명세서 기반 응답 타입
export interface ApiWeeklyInsightResponse {
  success: boolean;
  data: {
    date: string;
    insights: string;
  };
}

export interface ApiMonthlyInsightResponse {
  success: boolean;
  data: {
    yearMonth: string;
    insights: string;
  };
}
