import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
  password: z.string().min(8, { message: '비밀번호는 최소 8자리 이상이어야 합니다.' }),
});
