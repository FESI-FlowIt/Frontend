import { getRequest } from '@/api';
import { ApiMonthlyInsightResponse, ApiWeeklyInsightResponse } from '@/interfaces/insight';

export const getWeeklyInsight = async (date: string): Promise<ApiWeeklyInsightResponse> => {
  const apiResponse: ApiWeeklyInsightResponse = await getRequest(
    `/heatmaps/todo-timers/insight/weekly/${date}`,
  );

  return apiResponse;
};

export const getMonthlyInsight = async (yearMonth: string): Promise<ApiMonthlyInsightResponse> => {
  const apiResponse: ApiMonthlyInsightResponse = await getRequest(
    `/heatmaps/todo-timers/insight/monthly/${yearMonth}`,
  );

  return apiResponse;
};
