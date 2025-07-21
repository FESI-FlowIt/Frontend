import { http, HttpResponse } from 'msw';

import { goalSummariesRes } from '../mockResponses/goals/goalsResponse';

export const goalHandlers = [
  http.get('/api/goals', async () => {
    const isSuccess = true;

    if (isSuccess) {
      return HttpResponse.json(goalSummariesRes);
    }

    return HttpResponse.json({ message: '목표 데이터를 불러오지 못했습니다.' }, { status: 500 });
  }),

  http.patch('api/goals/:goalId', async ({ params, request }) => {
    const { goalId } = params;
    const body = (await request.json()) as { isPinned: boolean };

    const goal = goalSummariesRes.find(g => g.goalId === goalId);
    if (!goal) {
      return HttpResponse.json({ message: '목표를 찾을 수 없습니다.' }, { status: 404 });
    }

    goal.isPinned = body.isPinned;

    return HttpResponse.json(goal);
  }),
];
