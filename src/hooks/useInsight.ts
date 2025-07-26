import { useQuery } from '@tanstack/react-query';

import { MonthlyInsightResponse, WeeklyInsightResponse } from '@/interfaces/insight';

export const useWeeklyInsight = () => {
  return useQuery<WeeklyInsightResponse>({
    queryKey: ['weeklyInsight'],
    queryFn: async () => {
      const res = await fetch('/insights/weekly');
      return res.json();
    },
  });
};

export const useMonthlyInsight = () => {
  return useQuery<MonthlyInsightResponse>({
    queryKey: ['monthlyInsight'],
    queryFn: async () => {
      const res = await fetch('/insights/monthly');
      return res.json();
    },
  });
};
