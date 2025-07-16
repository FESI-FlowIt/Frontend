import { http, HttpResponse } from 'msw';

export const authHandlers = [
  http.post('/auth/signIn', async ({ request }) => {
    const { email, password } = (await request.json()) as { email: string; password: string };
    if (email === 'test1@test.com' && password === 'asd123123') {
      return HttpResponse.json({
        id: '1',
        email,
        token: 'fake-jwt-token',
      });
    }
    return HttpResponse.json(
      { message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 },
    );
  }),
];
