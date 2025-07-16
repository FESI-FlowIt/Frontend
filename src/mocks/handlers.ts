// src/mocks/handlers.ts

import { http, HttpResponse } from 'msw';
import { mockGoalSummaries } from './data/mockGoalSummaries';

export const handlers = [
  http.get('/api/goals', () => {
    return HttpResponse.json(mockGoalSummaries);
  }),
];
