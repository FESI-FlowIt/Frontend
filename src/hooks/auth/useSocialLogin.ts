import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getUser, postSocialLogin } from '@/api/authApi';
import { ROUTES } from '@/lib/routes';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';

export default function useSocialLogin() {
  const { setAccessToken } = useAuthStore();
  const { setUser } = useUserStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ code }: { code: string }) => postSocialLogin(code),
    onSuccess: async data => {
      setAccessToken(data.accessToken);
      const user = await queryClient.fetchQuery({
        queryKey: ['user'],
        queryFn: getUser,
      });
      setUser(user.result);

      router.push(ROUTES.DASHBOARD);
    },
    onError: error => {
      console.error('socialLogin error:', error);
    },
  });
}
