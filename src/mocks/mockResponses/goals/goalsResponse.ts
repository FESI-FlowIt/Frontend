import { GetGoalsResponse } from '@/interfaces/goal';

export const goalSummariesRes: GetGoalsResponse = {
  goals: [
    {
      goalId: 1000, // 'goal-ui-test' → 1000 (테스트용 고유 숫자)
      title: 'UI 테스트용 대량 할일 목표',
      dDay: 15, // 08/10
      deadlineDate: '08/10',
      color: 'purple',
      isPinned: true,
      createdAt: '2025-07-25T12:00:00Z',
      todos: Array.from({ length: 30 }, (_, index) => ({
        id: 10000 + index + 1, // 'ui-test-todo-1' → 10001, ...
        title: `UI 테스트 할일 ${index + 1}`,
        isDone: index < 10,
      })),
    },
    {
      goalId: 1,
      title: '프론트엔드 프로젝트 완성',
      dDay: 3, // 07/28
      deadlineDate: '07/28',
      color: 'orange',
      isPinned: false,
      createdAt: '2025-07-10T12:00:00Z',
      todos: [
        { id: 1, title: '대시보드 UI 구현', isDone: true },
        { id: 2, title: 'API 연동', isDone: true },
        { id: 3, title: '캘린더 UI 구현', isDone: false },
        { id: 4, title: '할일 UI 구현', isDone: false },
      ],
    },
    {
      goalId: 2,
      title: 'UI 고도화',
      dDay: 1, // 07/26
      deadlineDate: '07/26',
      color: 'red',
      isPinned: false,
      createdAt: '2025-07-18T00:00:00Z',
      todos: [
        { id: 5, title: '컴포넌트 리팩토링', isDone: true },
        { id: 6, title: '스타일 가이드 적용', isDone: true },
        { id: 7, title: '반응형 웹 구현', isDone: true },
        { id: 8, title: '접근성 개선', isDone: true },
      ],
    },
    {
      goalId: 3,
      title: '알고리즘',
      dDay: 2, // 07/27
      deadlineDate: '07/27',
      color: 'green',
      isPinned: false,
      createdAt: '2025-07-10T12:00:00Z',
      todos: [
        { id: 9, title: '백준 문제 10개 풀기', isDone: false },
        { id: 10, title: '정렬 알고리즘 복습', isDone: true },
        { id: 11, title: 'DFS/BFS 문제 풀기', isDone: false },
      ],
    },
    {
      goalId: 4,
      title: '기획',
      dDay: 7, // 08/01
      deadlineDate: '08/01',
      color: 'yellow',
      isPinned: false,
      createdAt: '2025-07-10T12:00:00Z',
      todos: [
        { id: 12, title: '사용자 요구사항 분석', isDone: true },
        { id: 13, title: '와이어프레임 작성', isDone: false },
        { id: 14, title: '프로토타입 제작', isDone: false },
        { id: 15, title: '사용자 테스트 계획', isDone: false },
      ],
    },
    {
      goalId: 5,
      title: '운동',
      dDay: 4, // 07/29
      deadlineDate: '07/29',
      color: 'pink',
      isPinned: false,
      createdAt: '2025-07-10T12:00:00Z',
      todos: [
        { id: 16, title: '주 3회 헬스장 가기', isDone: true },
        { id: 17, title: '매일 30분 러닝', isDone: false },
        { id: 18, title: '스트레칭 루틴 만들기', isDone: true },
      ],
    },
    {
      goalId: 6,
      title: '백엔드 API 개발',
      dDay: 11, // 08/05
      deadlineDate: '08/05',
      color: 'blue',
      isPinned: true,
      createdAt: '2025-07-15T09:00:00Z',
      todos: [
        { id: 19, title: 'RESTful API 설계', isDone: false },
        { id: 20, title: '인증 시스템 구현', isDone: false },
        { id: 21, title: 'API 문서화', isDone: false },
        { id: 22, title: '테스트 코드 작성', isDone: false },
      ],
    },
    {
      goalId: 7,
      title: '데이터베이스 설계',
      dDay: 14, // 08/08
      deadlineDate: '08/08',
      color: 'purple',
      isPinned: false,
      createdAt: '2025-07-12T14:30:00Z',
      todos: [
        { id: 23, title: 'ERD 작성', isDone: true },
        { id: 24, title: '정규화 작업', isDone: true },
        { id: 25, title: '인덱스 설계', isDone: false },
      ],
    },
    {
      goalId: 8,
      title: '테스트 코드 작성',
      dDay: 18, // 08/12
      deadlineDate: '08/12',
      color: 'orange',
      isPinned: true,
      createdAt: '2025-07-08T16:45:00Z',
      todos: [
        { id: 26, title: '단위 테스트 작성', isDone: true },
        { id: 27, title: '통합 테스트 작성', isDone: true },
        { id: 28, title: 'E2E 테스트 구축', isDone: true },
        { id: 29, title: '테스트 커버리지 90% 달성', isDone: true },
      ],
    },
    {
      goalId: 9,
      title: '디자인 시스템 구축',
      dDay: 21, // 08/15
      deadlineDate: '08/15',
      color: 'red',
      isPinned: false,
      createdAt: '2025-07-05T11:20:00Z',
      todos: [
        { id: 30, title: '컬러 팔레트 정의', isDone: true },
        { id: 31, title: '타이포그래피 시스템', isDone: false },
        { id: 32, title: '컴포넌트 라이브러리 구축', isDone: false },
      ],
    },
    {
      goalId: 10,
      title: '성능 최적화',
      dDay: 26, // 08/20
      deadlineDate: '08/20',
      color: 'green',
      isPinned: false,
      createdAt: '2025-07-03T08:15:00Z',
      todos: [],
    },
    {
      goalId: 11,
      title: '배포 자동화',
      dDay: 31, // 08/25
      deadlineDate: '08/25',
      color: 'yellow',
      isPinned: true,
      createdAt: '2025-07-01T13:40:00Z',
      todos: [],
    },
    {
      goalId: 12,
      title: '문서화 작업',
      dDay: 36, // 08/30
      deadlineDate: '08/30',
      color: 'pink',
      isPinned: false,
      createdAt: '2025-06-28T10:25:00Z',
      todos: [],
    },
    {
      goalId: 13,
      title: '코드 리뷰 프로세스 개선',
      dDay: 42, // 09/05
      deadlineDate: '09/05',
      color: 'blue',
      isPinned: false,
      createdAt: '2025-06-25T15:30:00Z',
      todos: [],
    },
    {
      goalId: 14,
      title: '모니터링 시스템 구축',
      dDay: 47, // 09/10
      deadlineDate: '09/10',
      color: 'purple',
      isPinned: true,
      createdAt: '2025-06-22T12:10:00Z',
      todos: [],
    },
    {
      goalId: 15,
      title: '보안 검토',
      dDay: 52, // 09/15
      deadlineDate: '09/15',
      color: 'orange',
      isPinned: false,
      createdAt: '2025-06-20T09:55:00Z',
      todos: [],
    },
    {
      goalId: 16,
      title: '사용자 피드백 분석',
      dDay: 57, // 09/20
      deadlineDate: '09/20',
      color: 'red',
      isPinned: false,
      createdAt: '2025-06-18T14:20:00Z',
      todos: [],
    },
    {
      goalId: 17,
      title: '새로운 기능 기획',
      dDay: 62, // 09/25
      deadlineDate: '09/25',
      color: 'green',
      isPinned: true,
      createdAt: '2025-06-15T11:45:00Z',
      todos: [],
    },
    {
      goalId: 18,
      title: '마케팅 전략 수립',
      dDay: 67, // 09/30
      deadlineDate: '09/30',
      color: 'yellow',
      isPinned: false,
      createdAt: '2025-06-12T16:30:00Z',
      todos: [],
    },
    {
      goalId: 19,
      title: '고객 지원 시스템 개선',
      dDay: 72, // 10/05
      deadlineDate: '10/05',
      color: 'pink',
      isPinned: false,
      createdAt: '2025-06-10T08:40:00Z',
      todos: [],
    },
    {
      goalId: 20,
      title: '팀 워크숍 준비',
      dDay: 77, // 10/10
      deadlineDate: '10/10',
      color: 'blue',
      isPinned: true,
      createdAt: '2025-06-08T13:15:00Z',
      todos: [],
    },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 4,
    totalCount: 20,
    hasNext: true,
    hasPrev: false,
  },
};
