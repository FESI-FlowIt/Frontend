import { http, HttpResponse } from 'msw';

import { LoginFormData } from '@/components/molecules/LoginForm';

export const handlers = [
  http.post('/auth/signIn', async ({ request }) => {
    const { email, password } = (await request.json()) as LoginFormData;
    if (email === 'test1@test.com' && password === 'asd123123') {
      return HttpResponse.json({
        id: '1',
        email,
        token: 'fake-jwt-token',
      });
    }
    return new HttpResponse('Unauthorized', { status: 401 });
  }),
];
