'use server';

import { cookies } from 'next/headers';

interface CookieOptions {
  expires?: Date | number;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
}

export const setCookie = async (
  name: string,
  value: string,
  options: CookieOptions = {},
): Promise<void> => {
  const defaultOptions: CookieOptions = {
    path: '/',
    maxAge: 24 * 60 * 60,
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  };

  const cookieOptions = { ...defaultOptions, ...options };
  const cookieStore = await cookies();

  cookieStore.set(name, value, cookieOptions);
};

export const getCookie = async (name: string): Promise<string | undefined> => {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
  } catch (err) {
    console.error(`Error getting cookie ${name}: `, err);
    return undefined;
  }
};

export const deleteCookie = async (
  name: string,
  options: Pick<CookieOptions, 'path' | 'domain'> = {},
): Promise<void> => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete({ name, ...options });
  } catch (err) {
    console.error(`Error deleting cookie ${name}:`, err);
  }
};
