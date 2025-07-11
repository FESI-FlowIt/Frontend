import React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-white',
      secondary: 'bg-white',
    },
    inputSize: {
      default: 'h-5',
      sm: 'h-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    inputSize: 'default',
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ inputSize, variant }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input, inputVariants };
