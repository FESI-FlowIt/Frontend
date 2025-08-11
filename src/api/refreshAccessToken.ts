import { deleteCookie, setCookie } from '@/lib/cookies';
import { ROUTES } from '@/lib/routes';

import { BASE_URL } from './apiWrapper';

let refreshPromise: Promise<string | null> | null = null;

export const refreshAccessToken = async (
  refreshToken: string | undefined,
): Promise<string | null> => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${BASE_URL}/auths/tokens`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: refreshToken,
            grantType: 'refresh_token',
          }),
        });

        if (!res.ok) throw new Error('Failed to refresh token');

        const { result } = await res.json();
        const newAccessToken = result?.result.accessToken;

        if (!newAccessToken) throw new Error('Token missing in response');

        await setCookie('accessToken', newAccessToken);

        if (result?.result.refreshToken) {
          const refreshToken = result?.result.refreshToken;
          await setCookie('refreshToken', refreshToken);
        }

        return newAccessToken;
      } catch {
        await deleteCookie('accessToken');
        window.location.href = ROUTES.AUTH.LOGIN;
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
};
