import { authHandlers } from './authHandlers';
import { calendarHandlers } from './calendarHandlers';
import { goalHandlers } from './goalHandlers';
import { heatmapHandlers } from './heatmapHandlers';
import { insightsHandlers } from './insightHandlers';
import { noteHandlers } from './noteHandlers';
import { todoHandlers } from './todoHandlers';

export const handlers = [
  ...authHandlers,
  ...goalHandlers,
  ...heatmapHandlers,
  ...todoHandlers,
  ...insightsHandlers,
  ...calendarHandlers,
  ...noteHandlers,
];
