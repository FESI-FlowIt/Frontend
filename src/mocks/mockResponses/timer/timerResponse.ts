import { Goal } from '@/interfaces/dashboardgoalInterface';

export const mockGoals: Goal[] = [
    {
      id: 'g1',
      title: '개발',
      color: 'red',
      todos: [
        { id: 't1', title: '피그마 정리' },
        { id: 't2', title: '컴포넌트 리팩토링' },
      ],
    },
    {
      id: 'g2',
      title: '알고리즘',
      color: 'yellow',
      todos: [{ id: 't3', title: '이분탐색 문제 풀기' }],
    },
  ];