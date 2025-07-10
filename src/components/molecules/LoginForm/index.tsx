import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/lib/validation';

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('로그인 데이터', data);
    // TODO: 추후에 로그인 api 연결
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input type="email" placeholder="이메일" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <Input type="password" placeholder="비밀번호" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <Button type="submit">로그인</Button>
    </form>
  );
}
