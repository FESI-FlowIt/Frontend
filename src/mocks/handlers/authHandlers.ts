import { http, HttpResponse } from 'msw';

import { loginRes, user } from '../mockResponses/auth/loginResponse';

export const authHandlers = [
  http.post('/auths/signIn', async ({ request }) => {
    const { email, password } = (await request.json()) as { email: string; password: string };
    if (email === user.email && password === user.password) {
      return HttpResponse.json(loginRes);
    }

    return new HttpResponse('Unauthorized', { status: 401 });
  }),

  http.post('/users', async () => {
    return HttpResponse.json({ message: '회원가입 성공!' }, { status: 200 });
  }),

  http.get('/users', async ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (email === user.email) {
      return HttpResponse.json({ message: '이미 사용 중인 이메일입니다' }, { status: 400 });
    }
    return HttpResponse.json({ message: '사용 가능한 이메일입니다!' }, { status: 200 });
  }),

  http.get('/users/me', () => {
    return HttpResponse.json(user);
  }),
];
