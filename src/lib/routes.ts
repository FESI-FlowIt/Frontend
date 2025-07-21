export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signUp',
  },
  GOALS: {
    goalDetail: (goalId: string) => `/goals/${goalId}`,
  },
};
