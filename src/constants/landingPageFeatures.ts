const CLOUDFRONT_URL = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_IMAGE_URL}`;

export const LANDINGPAGE_FEATURES = [
  {
    name: '목표 중심의 할 일 정리',
    imgUrl: `${CLOUDFRONT_URL}/assets/images/landing_goal.svg`,
    bgColor: 'bg-[#FDEAD9]',
  },
  {
    name: '마감일 캘린더',
    imgUrl: `${CLOUDFRONT_URL}/assets/images/landing_calendar.svg`,
    bgColor: 'bg-[#DBF5E4]',
  },
  {
    name: '스마트 타이머 & 자동 추적',
    imgUrl: `${CLOUDFRONT_URL}/assets/images/landing_timer.svg`,
    bgColor: 'bg-[#E1EBFF]',
  },
  {
    name: '작업 시간 히트맵 분석',
    imgUrl: `${CLOUDFRONT_URL}/assets/images/landing_heatmap.svg`,
    bgColor: 'bg-[#FDF2D2]',
  },
] as const;

export const LANDINGPAGE_FEATURE_DETAILS = [
  {
    name: '목표 중심의 할 일 정리',
    contents: [
      {
        name: '8가지 색상으로 목표를 구분 관리',
      },
      {
        name: '진행률을 시각적으로 추적',
      },
      {
        name: '목표 별 그룹화로 체계적으로 관리',
      },
    ],
    imgUrl: `${CLOUDFRONT_URL}/assets/images/landing_goal-detail.svg`,
  },
  {
    name: '마감일 캘린더',
    contents: [
      {
        name: '목표별 색상 뱃지로 한 눈에 확인',
      },
      {
        name: '마감 압박 알림',
      },
      {
        name: '일정 충돌 방지',
      },
    ],
    imgUrl: `${CLOUDFRONT_URL}/assets/images/landing_calendar-detail.svg`,
  },
  {
    name: '스마트 타이머 & 자동 추적',
    contents: [
      {
        name: '정확한 작업 시간 측정',
      },
      {
        name: '전역 플로팅 타이머 위젯',
      },
      {
        name: '히트맵 자동 반영',
      },
    ],
    imgUrl: `${CLOUDFRONT_URL}/assets/images/landing_timer-detail.svg`,
  },
  {
    name: '작업 시간 히트맵 분석',
    contents: [
      {
        name: '시간대 별 작업 패턴을 시각화',
      },
      {
        name: '개인화 된 생산성 인사이트',
      },
    ],
    imgUrl: `${CLOUDFRONT_URL}/assets/images/landing_heatmap-detail.svg`,
  },
  {
    name: '드래그앤드롭 일정 관리',
    contents: [
      {
        name: '시간대 별 할 일 배치',
      },
      {
        name: '직관적인 스케줄링',
      },
      {
        name: '실시간 일정 조정',
      },
    ],
    imgUrl: `${CLOUDFRONT_URL}/assets/images/landing_todos-detail.svg`,
  },
] as const;
