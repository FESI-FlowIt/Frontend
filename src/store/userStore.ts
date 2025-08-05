import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { User } from '@/interfaces/auth';

interface UserState {
  user: Omit<User, 'id'> | null;
  setUser: (_user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set): UserState => ({
      user: null,
      setUser: newUser => {
        if (newUser) {
          const rest = { ...newUser } as Omit<User, 'id'>;
          set({ user: rest });
        } else {
          set({ user: null });
        }
      },
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
