import { http, HttpResponse } from 'msw';

import {
  calendar202506Res,
  calendar202507Res,
  calendar202508Res,
} from '@/mocks/mockResponses/calendar/calendarResponse';

export const calendarHandlers = [
  http.get('/goals/todos/due-monthly', ({ request }) => {
    const url = new URL(request.url);
    const month = url.searchParams.get('month');

    switch (month) {
      case '2025-06':
        return HttpResponse.json(calendar202506Res);
      case '2025-07':
        return HttpResponse.json(calendar202507Res);
      case '2025-08':
        return HttpResponse.json(calendar202508Res);
    }
  }),
];
