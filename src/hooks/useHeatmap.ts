import { useQuery } from '@tanstack/react-query';

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

export const useMonthlyHeatmap = () => {
  return useQuery<MonthlyHeatmapResponse>({
    queryKey: ['monthlyHeatmap'],
    queryFn: async () => {
      const res = await fetch('/heatmaps/monthly');
      return res.json();
    },
  });
};
