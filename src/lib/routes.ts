export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  DASHBOARD: '/dashboard',
  GOALS: {
    LIST: '/goal',
    DETAIL: (goalId: string) => `/goal/${goalId}`,
  },
};
