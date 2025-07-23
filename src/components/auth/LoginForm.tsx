'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import useLogin from '@/hooks/auth/useLogin';
import { loginSchema } from '@/interfaces/auth';

import { Button } from '../ui/Button';

import AuthModal from './AuthModal';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

export type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
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
    onError: error => {
      setIsModalOpen(true);
      if (error?.errorField === 'email') {
        setEmailServerError('error.message');
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
      <EmailInput
        placeholder="이메일"
        register={register}
        email={email}
        serverError={emailServerError}
      />
      <PasswordInput
        placeholder="비밀번호"
        register={register}
        name="password"
        error={passwordServerError}
      />
      <Button disabled={!isFormValid}>로그인</Button>
      {isModalOpen && <AuthModal isOpen={isModalOpen} closeModal={handleCloseModal} mode="login" />}
    </form>
  );
}
