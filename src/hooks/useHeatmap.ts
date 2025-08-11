import { useQuery } from '@tanstack/react-query';

import { getMonthlyHeatmap } from '@/api/heatmap';
import { MonthlyHeatmapResponse, WeeklyHeatmapResponse } from '@/interfaces/heatmap';

export const useWeeklyHeatmap = () => {
  return useQuery<WeeklyHeatmapResponse>({
    queryKey: ['weeklyHeatmap'],
    queryFn: async () => {
      const res = await fetch('/heatmaps/weekly');
      return res.json();
    },
  });
};

export const useMonthlyHeatmap = (yearMonth: string) => {
  return useQuery<MonthlyHeatmapResponse>({
    queryKey: ['monthlyHeatmap', yearMonth],
    queryFn: () => getMonthlyHeatmap(yearMonth),
    enabled: !!yearMonth,
  });
};
