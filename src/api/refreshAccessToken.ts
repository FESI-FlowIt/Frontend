import { deleteCookie, setCookie } from '@/lib/cookies';

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

        const { result } = await res.json();
        const newAccessToken = result.accessToken;

        if (!newAccessToken) throw new Error('Token missing in response');

        await setCookie('accessToken', newAccessToken);

        if (result?.refreshToken) {
          const newRefreshToken = result.refreshToken;
          await setCookie('refreshToken', newRefreshToken);
        }

        return newAccessToken;
      } catch {
        await deleteCookie('accessToken');
        await deleteCookie('refreshToken');
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
};
