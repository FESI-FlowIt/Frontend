import { ApiMonthlyHeatmapResponse, MonthlyHeatmapResponse } from '@/interfaces/heatmap';

export const heatmapMapper = {
  mapApiToMonthlyHeatmap: (apiResponse: ApiMonthlyHeatmapResponse): MonthlyHeatmapResponse => {
    return {
      success: true,
      data: {
        month: apiResponse.result.yearMonth,
        days: apiResponse.result.weeklyHeatmaps.map(week => ({
          week_of_month: week.weekOfMonth,
          time_slots: week.timeSlots,
        })),
      },
    };
  },
};
