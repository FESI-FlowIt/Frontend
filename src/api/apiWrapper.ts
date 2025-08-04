import { RequestInit } from 'next/dist/server/web/spec-extension/request';

import { getCookie } from '@/lib/cookies';

import { getUser } from './authApi';
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

    if (!response.ok) {
      if (response.status === 401) {
        const data = await getUser();
        const userId = data.result.id;
        const refreshToken = await getCookie(`refreshToken_${userId}`);
        const newAccessToken = await refreshAccessToken(refreshToken, userId);

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
