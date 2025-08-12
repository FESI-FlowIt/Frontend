import { http, HttpResponse } from 'msw';

import { monthlyHeatmapRes } from '@/mocks/mockResponses/heatmap/monthlyHeatmapResponse';
import { weeklyHeatmapRes } from '@/mocks/mockResponses/heatmap/weeklyHeatmapResponse';

export const heatmapHandlers = [
  http.get('/heatmaps/todo-timers/weekly/:date', () => {
    return HttpResponse.json(weeklyHeatmapRes);
  }),

  http.get('/heatmaps/todo-timers/monthly/:yearMonth', () => {
    return HttpResponse.json(monthlyHeatmapRes);
  }),
];
