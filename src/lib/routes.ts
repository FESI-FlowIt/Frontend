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
    DETAIL: (goalId: number) => `/goal/${goalId}`,
    TODOS: {
      NOTES: () => `/goal/notes`,
    },
  },
  TODOS: {
    Note: {
      WRITE: (todoId: number) => `/todo/${todoId}/note/new`,
      EDIT: (todoId: number, noteId: number) => `/todo/${todoId}/note/${noteId}`,
    },
  },
};
