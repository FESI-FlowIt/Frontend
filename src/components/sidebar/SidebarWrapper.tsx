import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getGoalsSidebar } from '@/api/sidebarApi';
import { GOALS_SIDEBAR_QUERY_KEY } from '@/hooks/useSidebar';

import Sidebar from './Sidebar';

export default async function SidebarWrapper() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: GOALS_SIDEBAR_QUERY_KEY,
    queryFn: () => getGoalsSidebar(),
    retry: 2,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Sidebar />
    </HydrationBoundary>
  );
}
