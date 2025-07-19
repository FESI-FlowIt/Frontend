import { http, HttpResponse } from 'msw';

import { goalSummariesRes } from '@/mocks/mockResponses/goals/goalsResponse';

export const goalHandlers = [
  http.get('/api/goals', async () => {
    const isSuccess = true;

    if (isSuccess) {
      return HttpResponse.json(goalSummariesRes);
    }

    return HttpResponse.json({ message: '목표 데이터를 불러오지 못했습니다.' }, { status: 500 });
  }),
];
