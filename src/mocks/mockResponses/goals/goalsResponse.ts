import { GoalSummary } from '@/interfaces/dashboardgoalInterface';

export const goalSummariesRes: GoalSummary[] = [
  {
    goalId: 'goal-1',
    title: '프론트엔드 프로젝트 완성',
    dDay: 3,
    deadlineDate: '07/20',
    color: 'orange',
    isPinned: false,
    createdAt: '2025-07-10T12:00:00Z',
    todos: [
      { id: 'todo-1', content: '대시보드 UI 구현', isDone: true },
      { id: 'todo-2', content: 'API 연동', isDone: true },
      { id: 'todo-3', content: '캘린더 UI 구현', isDone: false },
      { id: 'todo-4', content: '할일 UI 구현', isDone: false },
    ],
  },
];
