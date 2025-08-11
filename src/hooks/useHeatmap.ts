import { useQuery } from '@tanstack/react-query';

import { getMonthlyHeatmap, getWeeklyHeatmap } from '@/api/heatmap';
import { MonthlyHeatmapResponse, WeeklyHeatmapResponse } from '@/interfaces/heatmap';

export const useWeeklyHeatmap = (date: string) => {
  return useQuery<WeeklyHeatmapResponse>({
    queryKey: ['weeklyHeatmap', date],
    queryFn: () => getWeeklyHeatmap(date),
    enabled: !!date,
  });
};

export const useMonthlyHeatmap = (yearMonth: string) => {
  return useQuery<MonthlyHeatmapResponse>({
    queryKey: ['monthlyHeatmap', yearMonth],
    queryFn: () => getMonthlyHeatmap(yearMonth),
    enabled: !!yearMonth,
  });
};
