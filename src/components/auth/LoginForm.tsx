'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import useLogin from '@/hooks/auth/useLogin';
import { useUser } from '@/hooks/auth/useUser';
import { loginSchema } from '@/interfaces/auth';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';

import { Button } from '../ui/Button';
import CustomLoading from '../ui/CustomLoading';

import AuthModal from './AuthModal';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

export type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setUser = useUserStore(state => state.setUser);
  const { accessToken } = useAuthStore();

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
    onError: () => {
      setIsModalOpen(true);
    },
  });

  const onSubmit = (formData: LoginFormData) => {
    setIsModalOpen(false);
    login.mutate(formData);
  };

  const { data } = useUser({
    enabled: Boolean(login.isSuccess && accessToken),
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  const shouldShowLoading = login.isPending || login.isSuccess;

  if (shouldShowLoading) {
    return <CustomLoading />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-20 sm:gap-12 md:gap-20">
      <EmailInput placeholder="이메일" register={register} email={email} />
      <PasswordInput placeholder="비밀번호" register={register} name="password" />
      <Button disabled={!isFormValid}>로그인</Button>
      {isModalOpen && <AuthModal isOpen={isModalOpen} closeModal={handleCloseModal} mode="login" />}
    </form>
  );
}
