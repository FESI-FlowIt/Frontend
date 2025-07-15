import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/auth/signIn', async ({ request }) => {
    const { email, password } = (await request.json()) as { email: string; password: string };
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
