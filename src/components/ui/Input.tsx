import React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva('', {
  variants: {
    variant: {
      default:
        'border-line focus-visible:border-primary-01-hover rounded-xl border bg-white focus:border-2 focus:outline-none',
    },
    inputSize: {
      default:
        'px-20 py-24 sm:h-44 sm:w-full sm:max-w-343 md:h-60 md:w-full md:max-w-600 lg:h-60 lg:w-600',
    },
    text: {
      default: 'text-body-sb-20 placeholder:text-text-inactive text-black',
    },
  },
  defaultVariants: {
    variant: 'default',
    inputSize: 'default',
    text: 'default',
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize, variant, text, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ inputSize, variant, text }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input, inputVariants };
