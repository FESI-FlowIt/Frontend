import { create } from 'zustand';

import type { User } from '@/interfaces/auth';

interface UserState {
  user: User | null;
  setUser: (_user: User | null) => void;
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: newUser => set({ user: newUser }),
}));
