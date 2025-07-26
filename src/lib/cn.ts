import clsx from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Font size group (타이포그래피)
      'font-size': [
        // Title
        'text-display-32',
        'text-display-24',
        'text-head-20',
        'text-head-16',
        'text-head-long-16',
        // Body
        'text-body-sb-20',
        'text-body-m-20',
        'text-body-20',
        'text-body-b-16',
        'text-body-m-16',
        'text-body-16',
        'text-body-long-m-16',
        'text-body-long-16',
        'text-body-b-12',
        'text-body-m-12',
        'text-body-12',
        // Logo
        'text-logo-52',
        'text-logo-31',
      ],
      // Text color group (텍스트 컬러)
      'text-color': [
        'text-text-00',
        'text-text-01',
        'text-text-02',
        'text-text-03',
        'text-text-04',
        'text-text-inactive',
        'text-error',
        'text-snackbar',
        'text-disable',
        'text-delete',
      ],
      'bg-color': [
        'bg-primary-01',
        'bg-primary-01-hover',
        'bg-secondary-01',
        'bg-secondary-01-hover',
        'bg-tertiary-01',
        'bg-tertiary-01-press',
        'bg-ui-background',
        'bg-ui-background-primary-soft',
        // Goal color
        'bg-goal-red',
        'bg-goal-orange',
        'bg-goal-yellow',
        'bg-goal-green',
        'bg-goal-blue',
        'bg-goal-purple',
        'bg-goal-pink',
        // HeatMap
        'bg-heatmap-0',
        'bg-heatmap-1',
        'bg-heatmap-2',
        'bg-heatmap-3',
        'bg-heatmap-4',
        'bg-heatmap-accent',
        // 기타
        'bg-line',
        'bg-disable',
        'bg-error',
        'bg-snackbar',
        'bg-delete',
      ],
      // Border radius group
      rounded: ['rounded-4', 'rounded-8', 'rounded-12', 'rounded-20'],
    },
  },
});

export const cn = (...inputs: Parameters<typeof clsx>) => {
  return customTwMerge(clsx(...inputs));
};
