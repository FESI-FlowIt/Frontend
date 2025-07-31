import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/routes';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';

export function useLogout() {
  const { clearAccessToken } = useAuthStore();
  const { clearUser } = useUserStore();
  const router = useRouter();

  return () => {
    clearAccessToken();
    clearUser();
    router.push(ROUTES.HOME);
  };
}
