import React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva('flex items-center justify-center cursor-pointer', {
  variants: {
    variant: {
      default: 'bg-white',
      secondary: 'bg-white',
      disable: 'bg-white',
    },
    size: {
      auth: 'h-10',
      check: 'h-5',
      modal: 'h-8',
    },
    rounded: {
      none: 'rounded-none',
      default: 'roundee-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'auth',
    rounded: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
