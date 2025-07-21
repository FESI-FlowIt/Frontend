export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signUp',
  },
  DASHBOARD: '/dashboard',
  GOAL: {
    LIST: '/goal',
    DETAIL: (goalId: string) => `/goal/${goalId}`,
  },
};
