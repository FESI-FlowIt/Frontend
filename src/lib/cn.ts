import clsx from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Font size group (타이포그래피)
      'font-size': [
        // Title
        'text-display-18',
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
        'text-logo-32',
        'text-logo-24',
        // Banner
        'text-banner-32',
        'text-banner-32-bold',
        'text-banner-44',
        'text-banner-44-bold',
        'text-banner-24',
      ],

      // Text color group
      'text-color': [
        // Base colors
        'text-white',
        'text-black',
        // Text colors
        'text-text-01',
        'text-text-02',
        'text-text-03',
        'text-text-04',
        // State colors
        'text-inactive',
        'text-disable',
        'text-error',
        'text-delete',
        // UI colors
        'text-line',
        'text-gray-01',
        'text-timer',
        'text-background',
        'text-cardContainer',
        'text-insightContainer',
        'text-sidebar-hover',
        'text-landing-blue',
        // Primary/Secondary colors
        'text-primary-01',
        'text-primary-01-hover',
        'text-secondary-01',
        'text-secondary-01-hover',
        'text-tertiary-01',
        'text-tertiary-01-press',
        // Goal colors
        'text-goal-red',
        'text-goal-orange',
        'text-goal-yellow',
        'text-goal-green',
        'text-goal-blue',
        'text-goal-purple',
        'text-goal-pink',
        // HeatMap colors
        'text-heatmap-0',
        'text-heatmap-1',
        'text-heatmap-2',
        'text-heatmap-3',
        'text-heatmap-4',
        'text-heatmap-accent',
      ],

      // Background color group
      'bg-color': [
        // Base colors
        'bg-white',
        'bg-black',
        // Primary/Secondary/Tertiary colors
        'bg-primary-01',
        'bg-primary-01-hover',
        'bg-secondary-01',
        'bg-secondary-01-hover',
        'bg-tertiary-01',
        'bg-tertiary-01-press',
        // State colors
        'bg-inactive',
        'bg-disable',
        'bg-error',
        'bg-delete',
        // UI colors
        'bg-line',
        'bg-gray-01',
        'bg-timer',
        'bg-background',
        'bg-cardContainer',
        'bg-insightContainer',
        'bg-sidebar-hover',
        'bg-landing-blue',
        // Goal colors
        'bg-goal-red',
        'bg-goal-orange',
        'bg-goal-yellow',
        'bg-goal-green',
        'bg-goal-blue',
        'bg-goal-purple',
        'bg-goal-pink',
        // HeatMap colors
        'bg-heatmap-0',
        'bg-heatmap-1',
        'bg-heatmap-2',
        'bg-heatmap-3',
        'bg-heatmap-4',
        'bg-heatmap-accent',
      ],

      // Border color group
      'border-color': [
        // Base colors
        'border-white',
        'border-black',
        // Primary/Secondary colors
        'border-primary-01',
        'border-primary-01-hover',
        'border-secondary-01',
        'border-secondary-01-hover',
        'border-tertiary-01',
        'border-tertiary-01-press',
        // State colors
        'border-inactive',
        'border-disable',
        'border-error',
        'border-delete',
        // UI colors
        'border-line',
        'border-gray-01',
        'border-timer',
        'border-background',
        'border-cardContainer',
        'border-insightContainer',
        'border-sidebar-hover',
        'border-landing-blue',
        // Goal colors
        'border-goal-red',
        'border-goal-orange',
        'border-goal-yellow',
        'border-goal-green',
        'border-goal-blue',
        'border-goal-purple',
        'border-goal-pink',
        // HeatMap colors
        'border-heatmap-0',
        'border-heatmap-1',
        'border-heatmap-2',
        'border-heatmap-3',
        'border-heatmap-4',
        'border-heatmap-accent',
      ],

      // Border radius group
      rounded: [
        // Standard Border Radius
        'rounded-4',
        'rounded-8',
        'rounded-12',
        'rounded-20',
        'rounded-24',
        // Special Border Radius
        'rounded-tr-50',
        'rounded-br-50',
        'rounded-tl-50',
        'rounded-bl-50',
      ],
    },
  },
});

export const cn = (...inputs: Parameters<typeof clsx>) => {
  return customTwMerge(clsx(...inputs));
};
