import { http, HttpResponse } from 'msw';

import { monthlyInsightRes } from '@/mocks/mockResponses/insight/monthlyInsightResponse';
import { weeklyInsightRes } from '@/mocks/mockResponses/insight/weeklyInsightResponse';

export const insightsHandlers = [
  http.get('/insights/weekly', async () => {
    return HttpResponse.json(weeklyInsightRes);
  }),

  http.get('/insights/monthly', () => {
    return HttpResponse.json(monthlyInsightRes);
  }),
];
