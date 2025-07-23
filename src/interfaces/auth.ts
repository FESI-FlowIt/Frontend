import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
  password: z.string().min(8, { message: '비밀번호는 최소 8자리 이상이어야 합니다.' }),
});

export const signupSchema = z
  .object({
    name: z.string().min(1, { message: '이름을 입력해주세요.' }),
    email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
    password: z.string().min(8, { message: '비밀번호가 8자리 이상되게 해주세요.' }),
    passwordCheck: z.string(),
  })
  .refine(data => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export interface User {
  name: string;
  email: string;
}
