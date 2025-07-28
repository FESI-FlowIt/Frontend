export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  DASHBOARD: '/dashboard',
  GOALS: {
    LIST: '/goal',
    //todo goalId는 number로 변경
    DETAIL: (goalId: string) => `/goal/${goalId}`,
  },
};
