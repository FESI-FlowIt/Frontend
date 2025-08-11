import { getRequest } from '@/api';
import { heatmapMapper } from '@/api/mapper/heatmapMapper';
import { ApiMonthlyHeatmapResponse, MonthlyHeatmapResponse } from '@/interfaces/heatmap';

export const getMonthlyHeatmap = async (yearMonth: string): Promise<MonthlyHeatmapResponse> => {
  const apiResponse: ApiMonthlyHeatmapResponse = await getRequest(
    `/heatmaps/todo-timers/monthly/${yearMonth}`,
  );

  return heatmapMapper.mapApiToMonthlyHeatmap(apiResponse);
};
