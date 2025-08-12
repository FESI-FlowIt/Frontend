import { getRequest } from '@/api';
import { heatmapMapper } from '@/api/mapper/heatmapMapper';
import {
  ApiMonthlyHeatmapResponse,
  ApiWeeklyHeatmapResponse,
  MonthlyHeatmapResponse,
  WeeklyHeatmapResponse,
} from '@/interfaces/heatmap';

export const getWeeklyHeatmap = async (date: string): Promise<WeeklyHeatmapResponse> => {
  const apiResponse: ApiWeeklyHeatmapResponse = await getRequest(
    `/heatmaps/todo-timers/weekly/${date}`,
  );

  return heatmapMapper.mapApiToWeeklyHeatmap(apiResponse);
};

export const getMonthlyHeatmap = async (yearMonth: string): Promise<MonthlyHeatmapResponse> => {
  const apiResponse: ApiMonthlyHeatmapResponse = await getRequest(
    `/heatmaps/todo-timers/monthly/${yearMonth}`,
  );

  return heatmapMapper.mapApiToMonthlyHeatmap(apiResponse);
};
