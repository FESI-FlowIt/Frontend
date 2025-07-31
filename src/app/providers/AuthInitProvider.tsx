'use client';

import { ReactNode, useEffect } from 'react';

import { useAuthStore } from '@/store/authStore';

export default function AuthInitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    useAuthStore.getState().initAccessToken();
  }, []);

  return <>{children}</>;
}
