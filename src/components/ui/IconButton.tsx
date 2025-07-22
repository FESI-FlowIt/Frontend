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
};

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'info' | 'close';
  'aria-label': string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, 'aria-label': ariaLabel, onClick, ...props }, ref) => {
    const { src, alt, className: iconClassName } = iconConfig[variant];

    return (
      <button
        className={cn(
          'inline-flex h-24 w-24 cursor-pointer items-center justify-center',
          className,
        )}
        aria-label={ariaLabel}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        <Image src={src} alt={alt} width={24} height={24} className={iconClassName} />
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

export { IconButton };
