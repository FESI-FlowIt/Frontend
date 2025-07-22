import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  accessToken: null,
  setAccessToken: token => set({ accessToken: token }),
  clearTokens: () => set({ accessToken: null }),
}));
