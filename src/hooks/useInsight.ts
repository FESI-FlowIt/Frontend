import { useQuery } from '@tanstack/react-query';

import { getMonthlyInsight, getWeeklyInsight } from '@/api/insightApi';
import { ApiMonthlyInsightResponse, ApiWeeklyInsightResponse } from '@/interfaces/insight';

export const useWeeklyInsight = (date: string) => {
  return useQuery<ApiWeeklyInsightResponse>({
    queryKey: ['weeklyInsight', date],
    queryFn: async () => getWeeklyInsight(date),
  });
};

export const useMonthlyInsight = (yearMonth: string) => {
  return useQuery<ApiMonthlyInsightResponse>({
    queryKey: ['monthlyInsight', yearMonth],
    queryFn: async () => getMonthlyInsight(yearMonth),
  });
};
