import { http, HttpResponse } from 'msw';

import { loginErr, loginRes } from '../mockResponses/auth/loginResponse';

export const authHandlers = [
  http.post('/auth/signIn', async ({ request }) => {
    const { email, password } = (await request.json()) as { email: string; password: string };
    if (email === 'test1@test.com' && password === 'asd123123') {
      return HttpResponse.json(loginRes);
    }
    return HttpResponse.json(loginErr, { status: 401 });
  }),
];
