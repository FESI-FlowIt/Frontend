import React from 'react';

import PrevIcon from '@/assets/icons/arrow-left.svg';
import NextIcon from '@/assets/icons/arrow-right.svg';
import CheckedIcon from '@/assets/icons/checkbox-checked-blue.svg';
import UncheckedIcon from '@/assets/icons/checkbox-unchecked.svg';
import CloseIcon from '@/assets/icons/close.svg';
import AlignmentCenterIcon from '@/assets/icons/ic-alignment-center.svg';
import AlignmentLeftIcon from '@/assets/icons/ic-alignment-left.svg';
import AlignmentRightIcon from '@/assets/icons/ic-alignment-right.svg';
import BoldIcon from '@/assets/icons/ic-bold.svg';
import BUlletIcon from '@/assets/icons/ic-bullet.svg';
import ColoringIcon from '@/assets/icons/ic-coloring.svg';
import ItalicIcon from '@/assets/icons/ic-italic.svg';
import NumberingIcon from '@/assets/icons/ic-numbering.svg';
import UnderLineIcon from '@/assets/icons/ic-underline.svg';
import InfoIcon from '@/assets/icons/info.svg';
import KebabIcon from '@/assets/icons/kebab.svg';
import LinkIcon from '@/assets/icons/link-alt.svg';
import { cn } from '@/lib/utils';

const iconConfig = {
  bold: {
    component: BoldIcon,
    className: '',
  },
  italic: {
    component: ItalicIcon,
    className: '',
  },
  underline: {
    component: UnderLineIcon,
    className: '',
  },
  alignmentLeft: {
    component: AlignmentLeftIcon,
    className: '',
  },
  alignmentCenter: {
    component: AlignmentCenterIcon,
    className: '',
  },
  alignmentRight: {
    component: AlignmentRightIcon,
    className: '',
  },
  bullet: {
    component: BUlletIcon,
    className: '',
  },
  numbering: {
    component: NumberingIcon,
    className: '',
  },
  coloring: {
    component: ColoringIcon,
    className: '',
  },
  link: {
    component: LinkIcon,
    className: 'fill-none',
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
    | 'alignmentLeft'
    | 'alignmentCenter'
    | 'alignmentRight'
    | 'bullet'
    | 'numbering'
    | 'coloring'
    | 'link';
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
