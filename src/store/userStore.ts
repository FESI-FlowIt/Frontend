import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { User } from '@/interfaces/auth';

interface UserState {
  user: User | null;
  setUser: (_user: User | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      setUser: newUser => set({ user: newUser }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
