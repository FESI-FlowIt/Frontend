'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { postLogin } from '@/api/authApi';
import { LoginFormData } from '@/components/auth/LoginForm';
import { ROUTES } from '@/lib/routes';

type Options = {
  onError: (error: any) => void;
};

export default function useLogin({ onError }: Options) {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: LoginFormData) => postLogin(email, password),
    onSuccess: () => {
      router.push(ROUTES.DASHBOARD);
    },
    onError,
  });
}
