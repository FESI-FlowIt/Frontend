import { create } from 'zustand';

import { deleteCookie, getCookie, setCookie } from '@/lib/cookies';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => Promise<void>;
  clearAccessToken: () => Promise<void>;
  initAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  accessToken: null,

  setAccessToken: async (token: string) => {
    await setCookie('accessToken', token);
    set({ accessToken: token });
  },

  clearAccessToken: async () => {
    await deleteCookie('accessToken');
    set({ accessToken: null });
  },

  initAccessToken: async () => {
    const token = await getCookie('accessToken');
    if (token) set({ accessToken: token });
  },
}));
