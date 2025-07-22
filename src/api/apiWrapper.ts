import { RequestInit } from 'next/dist/server/web/spec-extension/request';

import { useAuthStore } from '@/store/authStore';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export class CustomError extends Error {
  data: any;
  constructor(message: string, data: any) {
    super(message);
    this.data = data;
  }
}

export async function fetchWrapper(url: string, options: RequestInit = {}) {
  const accessToken = useAuthStore.getState().accessToken;

  const headers: any = {
    'Cache-Control': 'no-cache',
    ...options.headers,
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    let response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401 && accessToken) {
        const refreshResponse = await fetch(`${BASE_URL}/auth/tokens`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!refreshResponse.ok) {
          throw new CustomError('Failed to refresh token', await refreshResponse.json());
        }

        const { accessToken: newAccessToken } = await refreshResponse.json();

        // zustand에 새로운 토큰 저장
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 새 accessToken으로 재시도
        headers.Authorization = `Bearer ${newAccessToken}`;

        response = await fetch(`${BASE_URL}${url}`, {
          ...options,
          headers,
        });

        if (!response.ok) {
          throw new CustomError(`HTTP error! status: ${response.status}`, await response.json());
        }
      } else {
        console.error('Response not OK:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        });
        throw new CustomError(`HTTP error! status: ${response.status}`, await response.json());
      }
    }

    if (response.status === 204) return;
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
