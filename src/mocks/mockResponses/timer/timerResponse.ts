import { Goal } from '@/interfaces/dashboardgoalInterface';

export const mockGoals: Goal[] = [
  {
    id: 'g1',
    title: '개발',
    color: 'red',
    todos: [
      {
        id: 't1',
        content: '피그마 파일을 폴더별로 정리',
        isDone: false,
      },
      {
        id: 't2',
        content: 'Button 컴포넌트를 공통화',
        isDone: false,
      },
    ],
  },
  {
    id: 'g2',
    title: '알고리즘',
    color: 'yellow',
    todos: [
      {
        id: 't3',
        content:
          '백준 이분탐색 문제 3개 풀기입니다다다다다다다다다다다ㅏ다닫다ㅏㅇ앙다다아아아앙아앙아아아아아ㅏ앙ㅇ',
        isDone: true,
      },
    ],
  },
];
