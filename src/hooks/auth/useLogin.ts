import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getUser, postLogin } from '@/api/authApi';
import { LoginFormData } from '@/components/auth/LoginForm';
import { ROUTES } from '@/lib/routes';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';

type Options = {
  onError: () => void;
  onMutate?: () => void;
};

export default function useLogin({ onError, onMutate }: Options) {
  const { setAccessToken } = useAuthStore();
  const { setUser } = useUserStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: LoginFormData) => postLogin(email, password),
    onSuccess: async data => {
      setAccessToken(data.accessToken);
      const user = await queryClient.fetchQuery({
        queryKey: ['user'],
        queryFn: getUser,
      });

      setUser(user.result);

      router.push(ROUTES.DASHBOARD);
    },
    onError,
    onMutate,
  });
}
