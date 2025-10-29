'use client';

import { useState } from 'react';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const handleGlobalError = (error: unknown) => {
  const e = error as any;
  const status = e?.statusCode ?? e?.status ?? e?.response?.status;

  const url =
    e?.config?.url || e?.response?.url || e?.message?.includes('/auth/login') ? '/auth/login' : '';

  console.log('[🧩 ReactQuery GlobalError]', status, url);

  if (url.includes('/auth/login')) return;

  if (!status) return;
  if (status >= 500) window.location.replace('/error/500error');
  else if (status >= 400) window.location.replace('/error/400error');
};

export default function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({ onError: handleGlobalError }),
        mutationCache: new MutationCache({ onError: handleGlobalError }),
        defaultOptions: {
          queries: { retry: 0, staleTime: 60_000 },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
