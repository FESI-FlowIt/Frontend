'use client';

import { useEffect, useState } from 'react';

export const MswProvider = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const initMSW = await import('@/mocks').then(res => res.initMsw);
      await initMSW();
      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  return <>{children}</>;
};
