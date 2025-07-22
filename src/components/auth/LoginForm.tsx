'use client';

import { useState } from 'react';

import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import useLogin from '@/hooks/auth/useLogin';
import { loginSchema } from '@/lib/validation';

import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

import AuthModal from './AuthModal';

export type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isShow, setIsShow] = useState(false);
  const [emailServerError, setEmailServerError] = useState<string | null>(null);
  const [passwordServerError, setPasswordServerError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  const { register, handleSubmit, watch } = useForm<LoginFormData>({
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

  const login = useLogin({
    onError: (error: any) => {
      setIsModalOpen(true);
      if (error?.errorField === 'email') {
        setEmailServerError(error.message);
      }
      if (error?.errorField === 'password') {
        setPasswordServerError(error.message);
      }
    },
  });

  const onSubmit = (formData: LoginFormData) => {
    setEmailServerError(null);
    setPasswordServerError(null);
    setIsModalOpen(false);
    login.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-20 sm:gap-12 md:gap-20">
      <div>
        <Input
          type="email"
          placeholder="이메일"
          defaultValue=""
          {...register('email')}
          hasError={!!emailServerError}
        />

        {emailServerError && <p className="text-body-m-20 text-error mt-12">{emailServerError}</p>}
      </div>

      <div className="mb-20 sm:mb-28 md:mb-20">
        <div className="relative h-60 w-600 sm:h-44 sm:w-full sm:max-w-343 md:h-60 md:w-full md:max-w-600">
          <Input
            type={isShow ? 'text' : 'password'}
            placeholder="비밀번호"
            defaultValue=""
            hasError={!!passwordServerError}
            className="pr-40"
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setIsShow(prev => !prev)}
            className="absolute top-1/2 right-18 -translate-y-1/2 cursor-pointer"
          >
            <Image
              src={
                isShow ? '/assets/images/visibility_on.svg' : '/assets/images/visibility_off.svg'
              }
              alt="패스워드 보여주기 이미지"
              width={24}
              height={24}
            />
          </button>
        </div>

        {passwordServerError && (
          <p className="text-body-m-20 text-error mt-12">{passwordServerError}</p>
        )}
      </div>

      <Button disabled={!isFormValid}>로그인</Button>
      {isModalOpen && <AuthModal isOpen={isModalOpen} closeModal={handleCloseModal} mode="login" />}
    </form>
  );
}
