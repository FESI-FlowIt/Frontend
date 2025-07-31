import { ROUTES } from '@/lib/routes';
import { useAuthStore } from '@/store/authStore';

import { BASE_URL } from './apiWrapper';

let refreshPromise: Promise<string | null> | null = null;

export const refreshAccessToken = async (oldToken: string): Promise<string | null> => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${BASE_URL}/auths/tokens`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oldToken}`,
          },
        });

        if (!res.ok) throw new Error('Failed to refresh token');

        const { accessToken: newAccessToken } = await res.json();
        useAuthStore.getState().setAccessToken(newAccessToken);
        return newAccessToken;
      } catch {
        useAuthStore.getState().clearAccessToken();
        window.location.href = ROUTES.AUTH.LOGIN;
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
};
