import { TodoWithNotes } from '@/interfaces/todo';

export const MOCK_TODOS_WITH_NOTES: TodoWithNotes[] = [
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
        content:
          '자바스크립트의 기본 문법과 변수, 함수에 대해 학습했다.\n\nvar, let, const의 차이점을 이해하고 호이스팅 개념도 익혔다.',
        link: 'https://developer.mozilla.org/ko/docs/Web/JavaScript',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
      },
      {
        noteId: 2,
        todoId: 1,
        title: 'DOM 조작 실습',
        content: 'querySelector와 addEventListener를 사용해서 간단한 인터랙션을 구현해봤다.',
        createdAt: '2024-01-16T14:20:00.000Z',
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
        content: 'React의 상태 관리를 위한 useState Hook에 대해 학습했다.',
        createdAt: '2024-01-17T09:15:00.000Z',
        updatedAt: '2024-01-17T09:15:00.000Z',
      },
    ],
  },
  {
    todoId: 3,
    title: 'TypeScript 타입 정의',
    isDone: false,
    goalId: 1,
    goalTitle: '프론트엔드 개발자 되기',
    notes: [],
  },
  {
    todoId: 4,
    title: 'API 연동 작업',
    isDone: false,
    notes: [
      {
        noteId: 4,
        todoId: 4,
        title: 'fetch API 사용법',
        content:
          'fetch를 사용해서 REST API와 통신하는 방법을 익혔다.\n\nasync/await 패턴으로 비동기 처리를 구현했다.',
        link: 'https://jsonplaceholder.typicode.com/',
        createdAt: '2024-01-18T16:45:00.000Z',
        updatedAt: '2024-01-18T16:45:00.000Z',
      },
    ],
  },
  {
    todoId: 5,
    title: '테스트 코드 작성',
    isDone: false,
    notes: [],
  },
];
