import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { getUser, postSocialLogin } from '@/api/authApi';
import { ROUTES } from '@/lib/routes';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';

export default function useSocialLogin() {
  const { setAccessToken } = useAuthStore();
  const { setUser } = useUserStore();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ code }: { code: string }) => postSocialLogin(code),
    onSuccess: async data => {
      setAccessToken(data.accessToken);

      try {
        const userData = await getUser();
        setUser(userData.result);
      } catch (e) {
        console.error('Failed to fetch user data:', e);
      }

      router.push(ROUTES.DASHBOARD);
    },
    onError: error => {
      console.error('socialLogin error:', error);
    },
  });
}
