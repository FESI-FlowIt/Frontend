import { http, HttpResponse } from 'msw';

import { monthlyHeatmapRes } from '@/mocks/mockResponses/heatmap/monthlyHeatmapResponse';
import { weeklyHeatmapRes } from '@/mocks/mockResponses/heatmap/weeklyHeatmapResponse';

export const heatmapHandlers = [
  http.get('/heatmaps/weekly', async () => {
    return HttpResponse.json(weeklyHeatmapRes);
  }),

  http.get('/heatmaps/monthly', () => {
    return HttpResponse.json(monthlyHeatmapRes);
  }),
];
