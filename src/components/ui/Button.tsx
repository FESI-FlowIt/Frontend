import React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva('flex cursor-pointer items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-primary-01 hover:bg-primary-01-hover',
      secondary: 'bg-secondary-01 hover:bg-secondary-01-hover',
      snackbar: 'bg-gray-01 hover:bg-gray-01',
      white: 'bg-white hover:bg-white',
      gray: 'bg-gray-01 hover:bg-gray-01',
      primary: 'border-primary-01 border bg-white hover:bg-white',
      transparent: 'bg-transparent',
      noteHeader: 'bg-disable',
    },
    text: {
      default: 'md:text-body-sb-20 sm:text-body-m-16 text-white',
      secondary: 'md:text-body-sb-20 sm:text-body-m-16 text-text-02',
      secondaryModal: 'text-body-m-16 text-text-02',
      primary: 'text-body-sb-20 text-primary-01',
      snackbar: 'text-body-m-16 text-white',
      todoCard: 'text-body-m-16 text-white',
      schedulecheck: 'text-body-sb-20 text-white',
      schedulecancel: 'text-body-sb-20 text-primary-01',
      noteHeader: 'md:text-body-b-16 text-body-m-16 text-primary-01',
      noteHeaderWhite: 'md:text-body-sb-20 text-body-m-16 text-white',
      tempNote: 'md:text-body-m-16 sm:text-body-m-12 text-white',
    },
    size: {
      auth: 'h-62 w-600 px-20 py-24 sm:h-44 sm:w-full sm:max-w-343 md:h-62 md:w-full md:max-w-600',
      check:
        'h-60 w-118 px-20 py-24 whitespace-nowrap sm:h-44 sm:w-80 md:h-60 md:w-full md:max-w-118',
      modal: 'h-48 w-full',
      md: 'px-auto h-40 w-200 py-8',
      todoCard: 'h-40 w-84',
      emptytodoCard: 'h-40 w-200',
      addgoal: 'h-48 w-260',
      authModal: 'h-48 w-120',
      noteHeader: 'sm:h-40 sm:w-84 md:h-44 md:w-118',
      schedule: 'h-48 w-120 sm:w-165.5',
      scheduleDashboard: 'h-40 w-120 sm:w-160',
      tempNote: 'h-40 w-84',
    },
    rounded: {
      none: 'rounded-none',
      lg: 'rounded-lg',
      default: 'rounded-xl',
    },
    isDisabled: {
      true: 'md:text-body-sb-20 sm:text-body-m-16 bg-disable hover:bg-disabled text-white hover:cursor-not-allowed',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    text: 'default',
    size: 'auth',
    rounded: 'default',
    isDisabled: true,
  },
});
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, text, rounded, children, icon, disabled, ...props }, ref) => {
    const btnStyles = buttonVariants({ variant, size, text, rounded, isDisabled: disabled });

    return (
      <button
        disabled={disabled}
        className={cn(btnStyles, className, icon && 'gap-4')}
        ref={ref}
        {...props}
      >
        {icon && (
          <div className={cn('mr-8 flex h-24 w-24 items-center justify-center')}>{icon}</div>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
