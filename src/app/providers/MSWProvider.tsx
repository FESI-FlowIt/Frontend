'use client';

import { useEffect } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const initMSW = async () => {
        const { worker } = await import('@/mocks/browser');
        await worker.start({
          onUnhandledRequest: 'bypass',
        });
        console.log('✅ MSW 워커 시작됨');
      };
      initMSW();
    }
  }, []);

  return <>{children}</>;
}
