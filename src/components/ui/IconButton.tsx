import React from 'react';

import PrevIcon from '@/assets/icons/arrow-left.svg';
import NextIcon from '@/assets/icons/arrow-right.svg';
import CheckedIcon from '@/assets/icons/checkbox-checked-blue.svg';
import UncheckedIcon from '@/assets/icons/checkbox-unchecked.svg';
import CloseIcon from '@/assets/icons/close.svg';
import InfoIcon from '@/assets/icons/info.svg';
import KebabIcon from '@/assets/icons/kebab.svg';
import { cn } from '@/lib/utils';

const iconConfig = {
  bold: {
    src: '/assets/icons/icbold.svg',
    alt: '굵게',
    className: '',
  },
  italic: {
    src: '/assets/icons/icitalic.svg',
    alt: '기울임꼴',
    className: '',
  },
  underline: {
    src: '/assets/icons/icunderline.svg',
    alt: '밑줄',
    className: '',
  },
  alignmentleft: {
    src: '/assets/icons/icAlignmentleft.svg',
    alt: '왼쪽 정렬',
    className: '',
  },
  alignmentcenter: {
    src: '/assets/icons/icAlignmentcenter.svg',
    alt: '가운데 정렬',
    className: '',
  },
  alignmentright: {
    src: '/assets/icons/icAlignmentright.svg',
    alt: '오른쪽 정렬',
    className: '',
  },
  bullet: {
    src: '/assets/icons/icBullet.svg',
    alt: '글머리 기호',
    className: '',
  },
  numbering: {
    src: '/assets/icons/icnumbering.svg',
    alt: '번호 매기기',
    className: '',
  },
  coloring: {
    src: '/assets/icons/iccoloring.svg',
    alt: '색상',
    className: '',
  },
  link: {
    src: '/assets/icons/linkAlt.svg',
    alt: '링크 첨부',
    className: '',
  },
  info: {
    component: InfoIcon,
    className: 'text-text-inactive',
  },
  close: {
    component: CloseIcon,
    className: 'text-gray-02',
  },
  back: {
    component: PrevIcon,
    className: 'text-snackbar',
  },
  prev: {
    component: PrevIcon,
    className: 'text-gray-01',
  },
  next: {
    component: NextIcon,
    className: 'text-snackbar',
  },
  paginationArrowPrev: {
    component: PrevIcon,
    className: 'text-snackbar',
  },
  paginationArrowNext: {
    component: NextIcon,
    className: 'text-snackbar',
  },
  kebab: {
    component: KebabIcon,
    className: 'text-snackbar',
  },
  checkboxChecked: {
    component: CheckedIcon,
    className: 'checkbox-checked-blue',
  },
  checkboxUnchecked: {
    component: UncheckedIcon,
    className: 'checkbox-unchecked',
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
    | 'checkboxUnchecked'
    | 'bold'
    | 'italic'
    | 'underline'
    | 'alignmentleft'
    | 'alignmentcenter'
    | 'alignmentright'
    | 'bullet'
    | 'numbering'
    | 'coloring'
    | 'link';
  'aria-label': string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, 'aria-label': ariaLabel, onClick, ...props }, ref) => {
    const { component: IconComponent, className: iconClassName } = iconConfig[variant];
    const isNavigation = variant === 'prev' || variant === 'next';

    return (
      <button
        className={cn(
          'inline-flex h-24 w-24 cursor-pointer items-center justify-center',
          isNavigation ? 'rounded-8 border-line h-24 w-24 border md:h-44 md:w-44' : 'h-24 w-24',
          className,
        )}
        aria-label={ariaLabel}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        <IconComponent
          width={isNavigation ? 14 : 24}
          height={isNavigation ? 14 : 24}
          className={iconClassName}
          fill="currentColor"
        />
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

export { IconButton };
