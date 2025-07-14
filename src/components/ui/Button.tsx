import React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva('flex cursor-pointer items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-primary-01 hover:bg-primary-01-hover',
      secondary: 'bg-secondary-01 hover:bg-secondary-01-hover',
      disable: 'bg-disable',
    },
    text: {
      default: 'text-body-sb-20 sm:text-body-m-16 text-white',
      secondary: 'text-body-sb-20 sm:text-body-16 text-text-02',
      disable: 'text-body-sb-20 sm:text-body-16 text-white',
    },
    size: {
      auth: 'h-62 w-600 px-20 py-24 sm:h-44 sm:w-full sm:min-w-343 md:w-full md:max-w-600',
      check: 'h-60 w-118 px-20 py-24 sm:h-44 sm:w-80 md:w-full md:max-w-118',
      modal: 'w-520',
    },
    rounded: {
      none: 'rounded-none',
      default: 'rounded-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    text: 'default',
    size: 'auth',
    rounded: 'default',
  },
});
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, text, rounded, children, icon, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, text, rounded }), className, icon && 'gap-4')}
        ref={ref}
        {...props}
      >
        {icon && <div className={cn('h-24 w-24')}>{icon}</div>}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
