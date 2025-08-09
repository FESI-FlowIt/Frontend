import { TodoWithNotes } from '@/interfaces/todo';

export const mockTodosWithNotes: TodoWithNotes[] = [
  {
    todoId: 1,
    title: '자바스크립트 기초 렌더링 통과',
    isDone: false,
    goalId: 1,
    goalTitle: '프론트엔드 개발자 되기',
    notes: [
      {
        noteId: 1,
        todoId: 1,
        title: '자바스크립트 기초 정리',
        updatedAt: '2024-01-15T10:30:00.000Z',
      },
      {
        noteId: 2,
        todoId: 1,
        title: 'DOM 조작 실습',
        updatedAt: '2024-01-16T14:20:00.000Z',
      },
    ],
  },
  {
    todoId: 2,
    title: 'React 컴포넌트 개발',
    isDone: true,
    goalId: 1,
    goalTitle: '프론트엔드 개발자 되기',
    notes: [
      {
        noteId: 3,
        todoId: 2,
        title: 'useState Hook 학습',
        updatedAt: '2024-01-17T09:15:00.000Z',
      },
      {
        noteId: 4,
        todoId: 2,
        title: 'useEffect Hook 정리',
        updatedAt: '2024-01-17T15:30:00.000Z',
      },
    ],
  },
  {
    todoId: 3,
    title: 'TypeScript 타입 정의',
    isDone: false,
    goalId: 1,
    goalTitle: '프론트엔드 개발자 되기',
    notes: [
      {
        noteId: 5,
        todoId: 3,
        title: 'TypeScript 기초',
        updatedAt: '2024-01-18T11:00:00.000Z',
      },
    ],
  },
  {
    todoId: 4,
    title: 'UI 디자인 시스템 구축',
    isDone: false,
    goalId: 2,
    goalTitle: 'UX/UI 디자이너 되기',
    notes: [
      {
        noteId: 6,
        todoId: 4,
        title: '컬러 시스템 정리',
        updatedAt: '2024-01-19T13:45:00.000Z',
      },
      {
        noteId: 7,
        todoId: 4,
        title: '타이포그래피 가이드',
        updatedAt: '2024-01-19T16:20:00.000Z',
      },
    ],
  },
  {
    todoId: 5,
    title: '사용자 테스트 진행',
    isDone: true,
    goalId: 2,
    goalTitle: 'UX/UI 디자이너 되기',
    notes: [
      {
        noteId: 8,
        todoId: 5,
        title: '테스트 계획 수립',
        updatedAt: '2024-01-20T10:00:00.000Z',
      },
    ],
  },
  {
    todoId: 6,
    title: '알고리즘 문제 해결',
    isDone: false,
    goalId: 3,
    goalTitle: '백엔드 개발자 되기',
    notes: [
      {
        noteId: 9,
        todoId: 6,
        title: '정렬 알고리즘 정리',
        updatedAt: '2024-01-21T14:30:00.000Z',
      },
    ],
  },
  {
    todoId: 7,
    title: 'API 설계 및 구현',
    isDone: false,
    goalId: 3,
    goalTitle: '백엔드 개발자 되기',
    notes: [
      {
        noteId: 10,
        todoId: 7,
        title: 'RESTful API 설계 원칙',
        updatedAt: '2024-01-22T09:00:00.000Z',
      },
      {
        noteId: 11,
        todoId: 7,
        title: 'Express.js 기본 설정',
        updatedAt: '2024-01-22T11:30:00.000Z',
      },
    ],
  },
  {
    todoId: 8,
    title: '데이터베이스 모델링',
    isDone: true,
    goalId: 3,
    goalTitle: '백엔드 개발자 되기',
    notes: [
      {
        noteId: 12,
        todoId: 8,
        title: 'ERD 설계',
        updatedAt: '2024-01-23T14:15:00.000Z',
      },
      {
        noteId: 13,
        todoId: 8,
        title: 'MySQL 테이블 생성',
        updatedAt: '2024-01-23T16:45:00.000Z',
      },
    ],
  },
  {
    todoId: 9,
    title: 'Next.js 프로젝트 세팅',
    isDone: false,
    goalId: 1,
    goalTitle: '프론트엔드 개발자 되기',
    notes: [
      {
        noteId: 14,
        todoId: 9,
        title: 'Next.js 13 App Router',
        updatedAt: '2024-01-24T10:20:00.000Z',
      },
    ],
  },
  {
    todoId: 10,
    title: 'Figma 프로토타입 제작',
    isDone: false,
    goalId: 2,
    goalTitle: 'UX/UI 디자이너 되기',
    notes: [
      {
        noteId: 15,
        todoId: 10,
        title: '와이어프레임 작성',
        updatedAt: '2024-01-25T13:30:00.000Z',
      },
      {
        noteId: 16,
        todoId: 10,
        title: '프로토타입 인터랙션',
        updatedAt: '2024-01-25T15:00:00.000Z',
      },
    ],
  },
  {
    todoId: 11,
    title: '반응형 웹 디자인',
    isDone: true,
    goalId: 1,
    goalTitle: '프론트엔드 개발자 되기',
    notes: [
      {
        noteId: 17,
        todoId: 11,
        title: 'CSS Grid 레이아웃',
        updatedAt: '2024-01-26T09:45:00.000Z',
      },
      {
        noteId: 18,
        todoId: 11,
        title: 'Flexbox 활용법',
        updatedAt: '2024-01-26T12:15:00.000Z',
      },
    ],
  },
  {
    todoId: 12,
    title: '사용자 경험 분석',
    isDone: false,
    goalId: 2,
    goalTitle: 'UX/UI 디자이너 되기',
    notes: [
      {
        noteId: 19,
        todoId: 12,
        title: '사용자 여정 맵핑',
        updatedAt: '2024-01-27T11:00:00.000Z',
      },
    ],
  },
  {
    todoId: 13,
    title: '서버 배포 및 운영',
    isDone: false,
    goalId: 3,
    goalTitle: '백엔드 개발자 되기',
    notes: [
      {
        noteId: 20,
        todoId: 13,
        title: 'AWS EC2 설정',
        updatedAt: '2024-01-28T14:30:00.000Z',
      },
      {
        noteId: 21,
        todoId: 13,
        title: 'Docker 컨테이너화',
        updatedAt: '2024-01-28T16:20:00.000Z',
      },
    ],
  },
  {
    todoId: 14,
    title: 'Git 협업 워크플로우',
    isDone: true,
    goalId: 1,
    goalTitle: '프론트엔드 개발자 되기',
    notes: [
      {
        noteId: 22,
        todoId: 14,
        title: 'Git Flow 전략',
        updatedAt: '2024-01-29T10:15:00.000Z',
      },
    ],
  },
  {
    todoId: 15,
    title: '접근성 가이드라인 적용',
    isDone: false,
    goalId: 2,
    goalTitle: 'UX/UI 디자이너 되기',
    notes: [
      {
        noteId: 23,
        todoId: 15,
        title: 'WCAG 2.1 가이드라인',
        updatedAt: '2024-01-30T13:00:00.000Z',
      },
      {
        noteId: 24,
        todoId: 15,
        title: '키보드 내비게이션 테스트',
        updatedAt: '2024-01-30T15:30:00.000Z',
      },
    ],
  },
];

// 목표별 필터링을 위한 헬퍼 함수
export const getTodosWithNotesByGoalId = (goalId?: number): TodoWithNotes[] => {
  if (!goalId || goalId === 0) {
    return mockTodosWithNotes;
  }
  return mockTodosWithNotes.filter(todo => todo.goalId === goalId);
};

// 특정 할 일의 노트 목록을 가져오는 헬퍼 함수 (NoteSummary 반환)
export const getNotesByTodoId = (todoId: number) => {
  const todo = mockTodosWithNotes.find(todo => todo.todoId === todoId);
  return todo?.notes || [];
};
