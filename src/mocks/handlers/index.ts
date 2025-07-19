import { authHandlers } from './authHandlers';
import { goalHandlers } from './goalHandlers'

export const handlers = [...authHandlers, ...goalHandlers];
