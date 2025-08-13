import { useQuery } from '@tanstack/react-query';

import { getMonthlyHeatmap, getWeeklyHeatmap } from '@/api/heatmap';
import { MonthlyHeatmapResponse, WeeklyHeatmapResponse } from '@/interfaces/heatmap';

type Opts = { enabled?: boolean };

export const useWeeklyHeatmap = (date: string, opts?: Opts) => {
  return useQuery<WeeklyHeatmapResponse>({
    queryKey: ['weeklyHeatmap', date],
    queryFn: () => getWeeklyHeatmap(date),
    enabled: !!date && (opts?.enabled ?? true),
    refetchInterval: 10 * 1000, // 10초마다 새로고침
    refetchOnWindowFocus: true, // 윈도우 포커스 시 새로고침
  });
};

export const useMonthlyHeatmap = (yearMonth: string, opts?: Opts) => {
  return useQuery<MonthlyHeatmapResponse>({
    queryKey: ['monthlyHeatmap', yearMonth],
    queryFn: () => getMonthlyHeatmap(yearMonth),
    enabled: !!yearMonth && (opts?.enabled ?? true),
    refetchInterval: 10 * 1000, // 10초마다 새로고침
    refetchOnWindowFocus: true, // 윈도우 포커스 시 새로고침
  });
};
