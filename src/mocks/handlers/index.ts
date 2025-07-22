import { authHandlers } from './authHandlers';
import { todoHandlers } from './todoHandlers';

export const handlers = [...authHandlers, ...todoHandlers];
