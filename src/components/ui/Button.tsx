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
      default: 'text-body-sb-20 sm:text-body-m-16',
      secondary: 'text-body-sb-20 sm:text-body-16',
    },
    size: {
      auth: 'h-[62px] w-[600px] px-5 py-6 sm:h-11 sm:w-full',
      check: 'h-[60px] w-[118px] px-5 py-6 sm:h-11 sm:w-20',
      modal: 'h-12 w-[520px]',
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
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, text, rounded, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, text, rounded }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
