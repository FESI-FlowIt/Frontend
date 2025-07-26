import React from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';

const iconConfig = {
  info: {
    src: '/assets/icons/infoIcon.svg',
    alt: '정보 아이콘',
    className: 'text-inactive',
  },
  close: {
    src: '/assets/icons/closeIcon.svg',
    alt: '닫기 아이콘',
    className: 'text-gray-02',
  },
  back: {
    src: '/assets/icons/prevIcon.svg',
    alt: '뒤로가기 아이콘',
    className: 'text-Gray_01',
  },
  prev: {
    src: '/assets/icons/prevIcon.svg',
    alt: '이전 아이콘',
    className: 'text-gray-01',
  },
  next: {
    src: '/assets/icons/nextIcon.svg',
    alt: '다음 아이콘',
    className: 'text-gray-01',
  },
  paginationArrowPrev: {
    src: '/assets/icons/prevIcon.svg',
    alt: '페이지네이션 아이콘',
    className: 'text-snackbar',
  },
  paginationArrowNext: {
    src: '/assets/icons/nextIcon.svg',
    alt: '페이지네이션 아이콘',
    className: 'text-snackbar',
  },
  kebab: {
    src: '/assets/icons/kebabIcon.svg',
    alt: '메뉴 아이콘',
    className: 'text-gray-01',
  },
  checkboxChecked: {
    src: '/assets/icons/check.svg',
    alt: '체크됨',
    className: 'text-primary-01',
  },
  checkboxUnchecked: {
    src: '/assets/icons/check_default.svg',
    alt: '체크 안됨',
    className: 'text-gray-300',
  },
};

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant:
    | 'info'
    | 'close'
    | 'back'
    | 'prev'
    | 'next'
    | 'paginationArrowPrev'
    | 'paginationArrowNext'
    | 'kebab'
    | 'checkboxChecked'
    | 'checkboxUnchecked';
  'aria-label': string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, 'aria-label': ariaLabel, onClick, ...props }, ref) => {
    const { src, alt, className: iconClassName } = iconConfig[variant];
    const isNavigation = variant === 'prev' || variant === 'next';

    return (
      <button
        className={cn(
          'inline-flex h-24 w-24 cursor-pointer items-center justify-center',
          isNavigation && 'rounded-8 border-line border',
          className,
        )}
        aria-label={ariaLabel}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        <Image
          src={src}
          alt={alt}
          width={isNavigation ? 14 : 24}
          height={isNavigation ? 14 : 24}
          className={iconClassName}
        />
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

export { IconButton };
