import { http, HttpResponse } from 'msw';

import { monthlyInsightRes } from '@/mocks/mockResponses/insight/monthlyInsightResponse';
import { weeklyInsightRes } from '@/mocks/mockResponses/insight/weeklyInsightResponse';

export const insightsHandlers = [
  http.get('/heatmaps/todo-timers/insight/weekly/:date', async () => {
    return HttpResponse.json(weeklyInsightRes);
  }),

  http.get('/heatmaps/todo-timers/insight/monthly/:yearMonth', () => {
    return HttpResponse.json(monthlyInsightRes);
  }),
];
