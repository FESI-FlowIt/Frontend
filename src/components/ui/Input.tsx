import React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva('', {
  variants: {
    variant: {
      default: 'focus:border-primary-01 border-line rounded-xl border bg-white',
    },
    inputSize: {
      default: 'sm:w-ful h-[60px] w-[600px] px-5 py-6 sm:h-11 md:w-full md:max-w-[600px]',
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
