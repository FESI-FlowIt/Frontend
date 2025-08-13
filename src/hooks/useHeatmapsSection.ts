import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useMonthlyHeatmap, useWeeklyHeatmap } from '@/hooks/useHeatmap';
import { useMonthlyInsight, useWeeklyInsight } from '@/hooks/useInsight';
import { getCurrentDate, getCurrentMonth } from '@/lib/calendar';

export const useHeatmapSection = (period: 'week' | 'month') => {
  const queryClient = useQueryClient();

  const isWeek = period === 'week';

  const weeklyHeatmap = useWeeklyHeatmap(getCurrentDate(), { enabled: isWeek });
  const monthlyHeatmap = useMonthlyHeatmap(getCurrentMonth(), { enabled: !isWeek });
  const weeklyInsight = useWeeklyInsight();
  const monthlyInsight = useMonthlyInsight();

  const currentHeatmap = isWeek ? weeklyHeatmap : monthlyHeatmap;
  const currentInsight = isWeek ? weeklyInsight : monthlyInsight;

  const hasError = !!currentHeatmap.error || !!currentInsight.error;

  const handleRetry = useCallback(() => {
    currentHeatmap.refetch();
    currentInsight.refetch();
  }, [currentHeatmap, currentInsight]);

  const refreshHeatmapData = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['heatmap'] });
    queryClient.invalidateQueries({ queryKey: ['insight'] });
  }, [queryClient]);

  return {
    weeklyHeatmapData: weeklyHeatmap.data,
    monthlyHeatmapData: monthlyHeatmap.data,
    weeklyInsightData: weeklyInsight.data,
    monthlyInsightData: monthlyInsight.data,
    hasError,
    handleRetry,
    refreshHeatmapData,
  };
};
