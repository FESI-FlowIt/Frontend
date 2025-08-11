import { ApiGoalSummary } from '@/interfaces/goal';

// 목표 상세 조회용 mock 데이터
export const goalDetailResponses: Record<number, ApiGoalSummary> = {
  // 목표 1: 프론트엔드 프로젝트 완성
  1: {
    goalId: 1,
    goalName: '프론트엔드 프로젝트 완성',
    color: 'orange',
    createDateTime: '2025-07-10T12:00:00Z',
    dueDateTime: '2025-07-28T23:59:59Z',
    isPinned: false,
    todos: [
      {
        todoId: 1,
        todoName: '대시보드 UI 구현',
        isDone: true,
        attachment: [
          {
            type: 'file',
            url: '/assets/icons/arrow-down.svg',
            fileName: 'arrow-down.svg',
            size: 1024,
          },
          {
            type: 'file',
            url: '/favicon.ico',
            fileName: 'favicon.ico',
            size: 15406,
          },
          {
            type: 'file',
            url: 'https://via.placeholder.com/300x200.png',
            fileName: 'placeholder-image.png',
            size: 5000,
          },
        ],
        notes: [
          {
            noteId: 101,
            todoId: 1,
            title: '구현 완료',
            content: '대시보드 UI 구현이 완료되었습니다.',
            wordCount: 15,
            createdAt: '2025-07-10T15:00:00Z',
            updatedAt: '2025-07-10T15:00:00Z',
          },
        ],
      },
      {
        todoId: 2,
        todoName: 'API 연동',
        isDone: true,
        attachment: [
          {
            type: 'link',
            url: 'https://api.example.com/docs',
            fileName: 'API Documentation',
          },
        ],
        notes: [],
      },
      {
        todoId: 3,
        todoName: '캘린더 UI 구현',
        isDone: false,
        attachment: [
          {
            type: 'file',
            url: '/uploads/calendar-mockup.pdf',
            fileName: 'calendar-mockup.pdf',
            size: 2048000,
          },
          {
            type: 'link',
            url: 'https://figma.com/calendar-design',
            fileName: 'Figma Design',
          },
        ],
        notes: [
          {
            noteId: 102,
            todoId: 3,
            title: '진행사항',
            content: '현재 70% 완료된 상태입니다.',
            wordCount: 12,
            createdAt: '2025-07-12T10:30:00Z',
            updatedAt: '2025-07-12T10:30:00Z',
          },
        ],
      },
      {
        todoId: 4,
        todoName: '할일 UI 구현',
        isDone: false,
        attachment: [
          {
            type: 'file',
            url: '/uploads/todo-wireframe.pdf',
            fileName: 'todo-wireframe.pdf',
            size: 1536000,
          },
          {
            type: 'file',
            url: '/uploads/todo-components.zip',
            fileName: 'todo-components.zip',
            size: 3072000,
          },
          {
            type: 'link',
            url: 'https://figma.com/todo-design',
            fileName: 'Todo UI Design',
          },
          {
            type: 'file',
            url: '/uploads/style-guide.pdf',
            fileName: 'style-guide.pdf',
            size: 2048000,
          },
          {
            type: 'link',
            url: 'https://mui.com/components/todo-list',
            fileName: 'Material UI Todo Examples',
          },
        ],
        notes: [
          {
            noteId: 103,
            todoId: 4,
            title: '시작 예정',
            content:
              '다음 주부터 시작할 예정입니다. 첨부된 와이어프레임과 디자인을 참고해서 진행하겠습니다.',
            wordCount: 25,
            createdAt: '2025-07-13T14:00:00Z',
            updatedAt: '2025-07-13T14:00:00Z',
          },
        ],
      },
    ],
    progressRate: 50,
  },

  // 목표 2: UI 고도화
  2: {
    goalId: 2,
    goalName: 'UI 고도화',
    color: 'red',
    createDateTime: '2025-07-18T00:00:00Z',
    dueDateTime: '2025-07-26T23:59:59Z',
    isPinned: false,
    todos: [
      {
        todoId: 5,
        todoName: '컴포넌트 리팩토링',
        isDone: true,
        attachment: [
          {
            type: 'file',
            url: '/uploads/refactor-plan.md',
            fileName: 'refactor-plan.md',
            size: 512000,
          },
          {
            type: 'file',
            url: '/uploads/before-after-comparison.xlsx',
            fileName: 'before-after-comparison.xlsx',
            size: 1024000,
          },
          {
            type: 'file',
            url: '/uploads/component-documentation.pdf',
            fileName: 'component-documentation.pdf',
            size: 2560000,
          },
          {
            type: 'link',
            url: 'https://github.com/project/pull/123',
            fileName: 'Refactoring Pull Request',
          },
        ],
        notes: [],
      },
      {
        todoId: 6,
        todoName: '스타일 가이드 적용',
        isDone: true,
        attachment: [
          {
            type: 'link',
            url: 'https://storybook.js.org/docs',
            fileName: 'Storybook Docs',
          },
        ],
        notes: [
          {
            noteId: 201,
            todoId: 6,
            title: '스타일 가이드 완료',
            content: '모든 컴포넌트에 스타일 가이드가 적용되었습니다.',
            wordCount: 20,
            createdAt: '2025-07-19T11:00:00Z',
            updatedAt: '2025-07-19T11:00:00Z',
          },
        ],
      },
      {
        todoId: 7,
        todoName: '반응형 웹 구현',
        isDone: true,
        attachment: [],
        notes: [],
      },
      {
        todoId: 8,
        todoName: '접근성 개선',
        isDone: true,
        attachment: [],
        notes: [],
      },
    ],
    progressRate: 100,
  },

  // 목표 3: 알고리즘
  3: {
    goalId: 3,
    goalName: '알고리즘',
    color: 'green',
    createDateTime: '2025-07-10T12:00:00Z',
    dueDateTime: '2025-07-27T23:59:59Z',
    isPinned: false,
    todos: [
      {
        todoId: 9,
        todoName: '백준 문제 10개 풀기',
        isDone: false,
        attachment: [
          {
            type: 'link',
            url: 'https://www.acmicpc.net/problem/1000',
            fileName: '백준 문제 링크',
          },
          {
            type: 'file',
            url: '/uploads/algorithm-solutions.py',
            fileName: 'algorithm-solutions.py',
            size: 256000,
          },
          {
            type: 'file',
            url: '/uploads/problem-analysis.docx',
            fileName: 'problem-analysis.docx',
            size: 1024000,
          },
          {
            type: 'link',
            url: 'https://github.com/user/algorithm-practice',
            fileName: 'Algorithm Practice Repository',
          },
          {
            type: 'file',
            url: '/uploads/time-complexity-notes.pdf',
            fileName: 'time-complexity-notes.pdf',
            size: 512000,
          },
          {
            type: 'link',
            url: 'https://leetcode.com/problemset/algorithms/',
            fileName: 'LeetCode Practice Problems',
          },
        ],
        notes: [
          {
            noteId: 301,
            todoId: 9,
            title: '진행 상황',
            content: '현재 7개 문제를 풀었습니다. 3개가 남았어요.',
            wordCount: 18,
            createdAt: '2025-07-10T16:00:00Z',
            updatedAt: '2025-07-10T16:00:00Z',
          },
        ],
      },
      {
        todoId: 10,
        todoName: '정렬 알고리즘 복습',
        isDone: true,
        attachment: [],
        notes: [],
      },
      {
        todoId: 11,
        todoName: 'DFS/BFS 문제 풀기',
        isDone: false,
        attachment: [
          {
            type: 'file',
            url: '/uploads/algorithm-notes.pdf',
            fileName: 'algorithm-notes.pdf',
            size: 1536000,
          },
          {
            type: 'file',
            url: '/uploads/dfs-implementation.py',
            fileName: 'dfs-implementation.py',
            size: 64000,
          },
          {
            type: 'file',
            url: '/uploads/bfs-implementation.py',
            fileName: 'bfs-implementation.py',
            size: 68000,
          },
          {
            type: 'link',
            url: 'https://visualgo.net/en/dfsbfs',
            fileName: 'DFS/BFS Visualization',
          },
          {
            type: 'file',
            url: '/uploads/graph-theory-book.pdf',
            fileName: 'graph-theory-book.pdf',
            size: 15360000,
          },
          {
            type: 'file',
            url: '/uploads/practice-problems.txt',
            fileName: 'practice-problems.txt',
            size: 32000,
          },
          {
            type: 'link',
            url: 'https://www.youtube.com/watch?v=graph-algorithms',
            fileName: 'Graph Algorithms Tutorial',
          },
          {
            type: 'file',
            url: '/uploads/complexity-analysis.xlsx',
            fileName: 'complexity-analysis.xlsx',
            size: 256000,
          },
          {
            type: 'file',
            url: '/uploads/test-cases.json',
            fileName: 'test-cases.json',
            size: 128000,
          },
          {
            type: 'link',
            url: 'https://github.com/algorithms/graph-traversal',
            fileName: 'Graph Traversal Examples',
          },
          {
            type: 'file',
            url: '/uploads/algorithm-cheatsheet.png',
            fileName: 'algorithm-cheatsheet.png',
            size: 1024000,
          },
          {
            type: 'file',
            url: '/uploads/study-schedule.docx',
            fileName: 'study-schedule.docx',
            size: 512000,
          },
        ],
        notes: [],
      },
    ],
    progressRate: 33,
  },

  // 목표 4: 기획
  4: {
    goalId: 4,
    goalName: '기획',
    color: 'yellow',
    createDateTime: '2025-07-10T12:00:00Z',
    dueDateTime: '2025-08-01T23:59:59Z',
    isPinned: false,
    todos: [
      {
        todoId: 12,
        todoName: '사용자 요구사항 분석',
        isDone: true,
        attachment: [
          {
            type: 'file',
            url: '/uploads/requirements.docx',
            fileName: 'requirements.docx',
            size: 2048000,
          },
        ],
        notes: [
          {
            noteId: 401,
            todoId: 12,
            title: '요구사항 정리',
            content: '사용자 인터뷰를 통해 핵심 요구사항을 정리했습니다.',
            wordCount: 25,
            createdAt: '2025-07-10T14:00:00Z',
            updatedAt: '2025-07-10T14:00:00Z',
          },
        ],
      },
      {
        todoId: 13,
        todoName: '와이어프레임 작성',
        isDone: false,
        attachment: [
          {
            type: 'link',
            url: 'https://figma.com/wireframe',
            fileName: 'Figma 와이어프레임',
          },
        ],
        notes: [],
      },
      {
        todoId: 14,
        todoName: '프로토타입 제작',
        isDone: false,
        attachment: [],
        notes: [],
      },
      {
        todoId: 15,
        todoName: '사용자 테스트 계획',
        isDone: false,
        attachment: [],
        notes: [],
      },
    ],
    progressRate: 25,
  },

  // 목표 5: 운동
  5: {
    goalId: 5,
    goalName: '운동',
    color: 'pink',
    createDateTime: '2025-07-10T12:00:00Z',
    dueDateTime: '2025-07-29T23:59:59Z',
    isPinned: false,
    todos: [
      {
        todoId: 16,
        todoName: '주 3회 헬스장 가기',
        isDone: true,
        attachment: [],
        notes: [
          {
            noteId: 501,
            todoId: 16,
            title: '운동 기록',
            content: '이번 주에 3번 헬스장에 다녀왔습니다. 벤치프레스 50kg 달성!',
            wordCount: 30,
            createdAt: '2025-07-10T19:00:00Z',
            updatedAt: '2025-07-10T19:00:00Z',
          },
        ],
      },
      {
        todoId: 17,
        todoName: '매일 30분 러닝',
        isDone: false,
        attachment: [
          {
            type: 'link',
            url: 'https://strava.com/activities',
            fileName: 'Strava 기록',
          },
          {
            type: 'file',
            url: '/uploads/running-plan.pdf',
            fileName: 'running-plan.pdf',
            size: 768000,
          },
          {
            type: 'file',
            url: '/uploads/fitness-tracker-data.csv',
            fileName: 'fitness-tracker-data.csv',
            size: 128000,
          },
          {
            type: 'link',
            url: 'https://youtube.com/watch?v=running-tips',
            fileName: 'Running Tips Video',
          },
          {
            type: 'file',
            url: '/uploads/heart-rate-zones.png',
            fileName: 'heart-rate-zones.png',
            size: 512000,
          },
          {
            type: 'file',
            url: '/uploads/weekly-schedule.xlsx',
            fileName: 'weekly-schedule.xlsx',
            size: 256000,
          },
          {
            type: 'link',
            url: 'https://maps.google.com/running-routes',
            fileName: 'Running Routes Map',
          },
          {
            type: 'file',
            url: '/uploads/nutrition-guide.pdf',
            fileName: 'nutrition-guide.pdf',
            size: 2048000,
          },
        ],
        notes: [],
      },
      {
        todoId: 18,
        todoName: '스트레칭 루틴 만들기',
        isDone: true,
        attachment: [
          {
            type: 'file',
            url: '/uploads/stretching-routine.pdf',
            fileName: 'stretching-routine.pdf',
            size: 1024000,
          },
        ],
        notes: [],
      },
    ],
    progressRate: 67,
  },

  // 목표 1000: UI 테스트용 대량 할일 목표
  1000: {
    goalId: 1000,
    goalName: 'UI 테스트용 대량 할일 목표',
    color: 'purple',
    createDateTime: '2025-07-25T12:00:00Z',
    dueDateTime: '2025-08-10T23:59:59Z',
    isPinned: true,
    todos: Array.from({ length: 30 }, (_, index) => ({
      todoId: 10000 + index + 1,
      todoName: `UI 테스트 할일 ${index + 1}`,
      isDone: index < 10,
      attachment: [],
      notes: [],
    })),
    progressRate: 33,
  },
};
