import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';

export function useLogout() {
  const { clearAccessToken } = useAuthStore();
  const { clearUser } = useUserStore();

  return async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });

    clearAccessToken();
    clearUser();

    window.location.href = '/';
  };
}
