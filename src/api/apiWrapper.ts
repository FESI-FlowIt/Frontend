import { RequestInit } from 'next/dist/server/web/spec-extension/request';

import { getCookie, setCookie } from '@/lib/cookies';

import { refreshAccessToken } from './refreshAccessToken';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export class CustomError extends Error {
  data: any;
  constructor(message: string, data: any) {
    super(message);
    this.data = data;
  }
}

export async function fetchWrapper(
  url: string,
  options: RequestInit = {},
  clientAccessToken?: string,
) {
  let accessToken: string | undefined;

  if (typeof window === 'undefined') {
    accessToken = await getCookie('accessToken');
  } else {
    accessToken = clientAccessToken;
  }

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

    const isLoginRequest = url.includes('/auths/signIn');

    if (isLoginRequest) {
      const tokenHeader = response.headers.get('Authorization');
      const token = tokenHeader?.startsWith('Bearer ') ? tokenHeader.split(' ')[1] : undefined;

      if (token !== undefined) {
        await setCookie('accessToken', token);
        return { accessToken: token };
      }
    }

    if (!response.ok) {
      if (response.status === 401 && accessToken) {
        const newAccessToken = await refreshAccessToken(accessToken);

        if (!newAccessToken) return;

        headers.Authorization = `Bearer ${newAccessToken}`;
        response = await fetch(`${BASE_URL}${url}`, {
          ...options,
          headers,
        });

        if (!response.ok) {
          throw new CustomError(`HTTP error! status: ${response.status}`, await response.json());
        }
      }
    }

    if (response.status === 204) return;

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
