'use client';

import React, { useState } from 'react';

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
        'h-60 w-600 px-20 py-24 sm:h-44 sm:w-full sm:max-w-343 md:h-60 md:w-full md:max-w-600',
      withBtn:
        'h-60 w-470 px-20 py-24 sm:h-45 sm:w-full sm:max-w-251 md:h-60 md:w-full md:max-w-470',
    },
    text: {
      default: 'text-body-sb-20 placeholder:text-text-inactive text-black',
    },
    isError: {
      true: 'border-error border-2',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    inputSize: 'default',
    text: 'default',
    isError: false,
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  value?: string;
  defaultValue?: string;
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      inputSize,
      variant,
      text,
      value,
      defaultValue,
      onChange,
      hasError,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;

    const [internalValue, setInternalValue] = useState(defaultValue);

    const currentValue = isControlled ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const inputStyles = inputVariants({ inputSize, variant, text, isError: hasError });

    return (
      <input
        type={type}
        className={cn(inputStyles, className)}
        ref={ref}
        value={currentValue}
        onChange={handleChange}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input, inputVariants };
