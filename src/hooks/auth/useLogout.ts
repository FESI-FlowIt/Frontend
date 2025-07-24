import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/routes';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';

export function useLogout() {
  const { clearTokens } = useAuthStore();
  const { setUser } = useUserStore();
  const router = useRouter();

  return () => {
    clearTokens();
    router.push(ROUTES.HOME);
    setUser(null);
  };
}
