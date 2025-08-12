import {
  ApiMonthlyHeatmapResponse,
  ApiWeeklyHeatmapResponse,
  MonthlyHeatmapResponse,
  WeeklyHeatmapResponse,
} from '@/interfaces/heatmap';

export const heatmapMapper = {
  mapApiToWeeklyHeatmap: (apiResponse: ApiWeeklyHeatmapResponse): WeeklyHeatmapResponse => {
    return {
      success: true,
      data: apiResponse.result.map(day => ({
        date: day.date,
        time_slots: day.timeSlots,
      })),
    };
  },

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
