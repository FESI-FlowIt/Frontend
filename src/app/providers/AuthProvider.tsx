// layout.tsx or app/provider.tsx (서버 쿠키에서 초기화)
'use client';

import { ReactNode, useEffect } from 'react';

import { useAuthStore } from '@/store/authStore';

interface Props {
  children: ReactNode;
  initialToken?: string;
}

export function AuthProvider({ children, initialToken }: Props) {
  const setAccessToken = useAuthStore(state => state.setAccessToken);

  useEffect(() => {
    if (initialToken) {
      setAccessToken(initialToken);
    }
  }, [initialToken, setAccessToken]);

  return <>{children}</>;
}
