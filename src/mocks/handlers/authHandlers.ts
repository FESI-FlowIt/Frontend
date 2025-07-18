import { http, HttpResponse } from 'msw';

import { loginRes } from '../mockResponses/auth/loginResponse';

export const authHandlers = [
  http.post('/auth/signIn', async ({ request }) => {
    const { email, password } = (await request.json()) as { email: string; password: string };
    if (email === 'test1@test.com' && password === 'asd123123') {
      return HttpResponse.json(loginRes);
    }

    if (email !== 'test1@test.com') {
      return HttpResponse.json(
        {
          success: false,
          errorField: 'email',
          message: '가입되지 않은 이메일입니다.',
        },
        { status: 401 },
      );
    }

    if (password !== 'asd123123') {
      return HttpResponse.json(
        {
          success: false,
          errorField: 'password',
          message: '비밀번호가 올바르지 않습니다.',
        },
        { status: 401 },
      );
    }
  }),

  http.post('/user', async () => {
    return HttpResponse.json({ message: '회원가입 성공!' }, { status: 200 });
  }),

  http.post('/auth/check-email', async ({ request }) => {
    const { email } = (await request.json()) as { email: string };
    if (email === 'test1@test.com') {
      return HttpResponse.json(
        { errorField: 'email', message: '이미 사용 중인 이메일입니다' },
        { status: 400 },
      );
    }
    return HttpResponse.json({ message: '사용 가능한 이메일입니다!' }, { status: 200 });
  }),
];
