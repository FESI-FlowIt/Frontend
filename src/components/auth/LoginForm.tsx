'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { loginSchema } from '@/lib/validation';

import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: LoginFormData) => {
    setIsLoading(true);

    //TODO: 서버 api 나오면 api관련 로직 만들어서 호출하는 부분 수정할 예정입니다.
    try {
      const res = await fetch('/auth/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        //TODO: 추후 api 요청 실패시 나온 response 값에 따라 공통 모달을 만들어서 보여줄 예정입니다.
        alert(errorData.message);
        return;
      }

      const data = await res.json();
      router.push('/dashboard');
      return data;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          type="email"
          placeholder="이메일"
          defaultValue=""
          {...register('email')}
          hasError={!!errors.email}
        />
        {errors?.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <Input
          type="password"
          placeholder="비밀번호"
          defaultValue=""
          hasError={!!errors.password}
          {...register('password')}
        />
        {errors?.password && <p>{errors.password.message}</p>}
      </div>
      <Button disabled={isLoading}>로그인</Button>
    </form>
  );
}
