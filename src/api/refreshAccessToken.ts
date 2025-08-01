import { deleteCookie, setCookie } from '@/lib/cookies';
import { ROUTES } from '@/lib/routes';

import { BASE_URL } from './apiWrapper';

let refreshPromise: Promise<string | null> | null = null;

export const refreshAccessToken = async (oldToken: string): Promise<string | null> => {
  //TODO: refreshAccessToken 로직은 추후에 세훈님께서 refreshToken 쿠키로 보내주신다고 하셔서 배포된 서버에 반영되면 쿠키에 맞게 수정하겠습니다.
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

        const { result } = await res.json();
        const newAccessToken = result?.accessToken;

        if (!newAccessToken) throw new Error('Token missing in response');

        await setCookie('accessToken', newAccessToken);
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
