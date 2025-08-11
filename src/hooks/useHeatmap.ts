import { useQuery } from '@tanstack/react-query';

import { getMonthlyHeatmap, getWeeklyHeatmap } from '@/api/heatmap';
import { MonthlyHeatmapResponse, WeeklyHeatmapResponse } from '@/interfaces/heatmap';

type Opts = { enabled?: boolean };

export const useWeeklyHeatmap = (date: string, opts?: Opts) => {
  return useQuery<WeeklyHeatmapResponse>({
    queryKey: ['weeklyHeatmap', date],
    queryFn: () => getWeeklyHeatmap(date),
    enabled: !!date && (opts?.enabled ?? true),
  });
};

export const useMonthlyHeatmap = (yearMonth: string, opts?: Opts) => {
  return useQuery<MonthlyHeatmapResponse>({
    queryKey: ['monthlyHeatmap', yearMonth],
    queryFn: () => getMonthlyHeatmap(yearMonth),
    enabled: !!yearMonth && (opts?.enabled ?? true),
  });
};
