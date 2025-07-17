'use client';

import { useEffect, useState } from 'react';

export const MswProvider = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(process.env.NODE_ENV !== 'development');

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('@/mocks').then(({ initMsw }) => {
        initMsw().finally(() => setMswReady(true));
      });
    }
  }, []);

  if (!mswReady) {
    return null;
  }

  return <>{children}</>;
};
