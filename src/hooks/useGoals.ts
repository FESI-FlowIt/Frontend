import { useQuery } from '@tanstack/react-query';

import { GoalSummary } from '@/interfaces/dashboardgoalInterface';

export function useGoals() {
  console.log('useGoals 훅 실행');
  return useQuery<GoalSummary[]>({
    queryKey: ['goals'],
    queryFn: async () => {
      const res = await fetch('/api/goals');
      if (!res.ok) throw new Error('Failed to fetch goals');
      return res.json();
    },
  });
}
