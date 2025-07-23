import { authHandlers } from './authHandlers';
import { goalHandlers } from './goalHandlers';
import { heatmapHandlers } from './heatmapHandlers';
import { insightsHandlers } from './insightHandlers';
import { todoHandlers } from './todoHandlers';

export const handlers = [
  ...authHandlers,
  ...goalHandlers,
  ...heatmapHandlers,
  ...todoHandlers,
  ...insightsHandlers,
];