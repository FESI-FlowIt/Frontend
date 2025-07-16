'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import off from '@/../public/assets/images/visibility_off.svg';
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
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const email = watch('email');
  const password = watch('password');
  const isFormValid = email.trim() !== '' && password.trim() !== '';

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-20 sm:gap-12 md:gap-20">
      <div>
        <Input
          type="email"
          placeholder="이메일"
          defaultValue=""
          {...register('email')}
          hasError={!!errors.email}
        />
        {errors?.email && <p className="text-body-m-20 text-error mt-12">{errors.email.message}</p>}
      </div>
      <div className="mb-20 sm:mb-28 md:mb-20">
        <div>
          <Input
            type="password"
            placeholder="비밀번호"
            defaultValue=""
            hasError={!!errors.password}
            {...register('password')}
          />
          <button className="relative h-24 w-24">
            <Image src={off} alt="패스워드 보여주기 이미지" fill />
          </button>
        </div>

        {errors?.password && (
          <p className="text-body-m-20 text-error mt-12">{errors.password.message}</p>
        )}
      </div>
      <Button disabled={isLoading || !isFormValid}>로그인</Button>
    </form>
  );
}
