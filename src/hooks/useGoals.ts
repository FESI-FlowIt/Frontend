// hooks/useGoals.ts
import { useQuery } from '@tanstack/react-query';
import { GoalSummary } from '@/interfaces/goalInterface';

export function useGoals() {
    console.log('useGoals 훅 실행'); // ✅ 콘솔 확인용
  return useQuery<GoalSummary[]>({
    queryKey: ['goals'],
    queryFn: async () => {
      const res = await fetch('/api/goals');
      if (!res.ok) throw new Error('Failed to fetch goals');
      return res.json();
    },
  });
}
