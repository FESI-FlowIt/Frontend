import { useQuery } from '@tanstack/react-query';

import { getMonthlyInsight, getWeeklyInsight } from '@/api/insightApi';
import { ApiMonthlyInsightResponse, ApiWeeklyInsightResponse } from '@/interfaces/insight';

type Opts = { enabled?: boolean };

export const useWeeklyInsight = (date: string, opts?: Opts) => {
  return useQuery<ApiWeeklyInsightResponse>({
    queryKey: ['weeklyInsight', date],
    queryFn: async () => getWeeklyInsight(date),
    enabled: !!date && (opts?.enabled ?? true),
  });
};

export const useMonthlyInsight = (yearMonth: string, opts?: Opts) => {
  return useQuery<ApiMonthlyInsightResponse>({
    queryKey: ['monthlyInsight', yearMonth],
    queryFn: async () => getMonthlyInsight(yearMonth),
    enabled: !!yearMonth && (opts?.enabled ?? true),
  });
};
