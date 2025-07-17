import clsx from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // 폰트 크기 그룹
      'font-size': [
        'text-display-32',
        'text-display-24',
        'text-head-20',
        'text-head-16',
        'text-head-long-16',
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
      ],
      // 텍스트 색상 그룹
      'text-color': [
        'text-text-00',
        'text-text-01',
        'text-text-02',
        'text-text-03',
        'text-text-04',
        'text-text-inactive',
      ],
    },
  },
});

export const cn = (...inputs: Parameters<typeof clsx>) => {
  return customTwMerge(clsx(...inputs));
};
