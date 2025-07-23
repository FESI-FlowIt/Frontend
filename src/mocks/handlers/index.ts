import { authHandlers } from './authHandlers';
import { goalHandlers } from './goalHandlers';
import { todoHandlers } from './todoHandlers';

export const handlers = [...authHandlers, ...goalHandlers, ...todoHandlers];
