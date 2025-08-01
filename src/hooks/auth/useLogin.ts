import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { postLogin } from '@/api/authApi';
import { LoginFormData } from '@/components/auth/LoginForm';
import { ROUTES } from '@/lib/routes';
import { useAuthStore } from '@/store/authStore';

type Options = {
  onError: () => void;
};

export default function useLogin({ onError }: Options) {
  const { setAccessToken } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: LoginFormData) => postLogin(email, password),
    onSuccess: data => {
      setAccessToken(data.accessToken);
      router.push(ROUTES.DASHBOARD);
    },
    onError,
  });
}
