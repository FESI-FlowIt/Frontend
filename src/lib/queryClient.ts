import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

import { routeByStatus } from '@/lib/routeByStatus';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      const e: any = error;
      const status = e?.statusCode ?? e?.status ?? e?.response?.status;
      routeByStatus(status);
    },
  }),
  mutationCache: new MutationCache({
    onError: error => {
      const e: any = error;
      const status = e?.statusCode ?? e?.status ?? e?.response?.status;
      routeByStatus(status);
    },
  }),
  defaultOptions: {
    queries: {
      retry: 0,
    },
    mutations: {},
  },
});
