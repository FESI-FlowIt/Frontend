import React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toggleButtonVariants = cva('relative rounded-full transition-colors duration-500', {
  variants: {
    size: {
      sm: 'h-16 w-28',
      md: 'h-20 w-36',
      lg: 'h-24 w-41',
      xl: 'h-28 w-48',
    },
    variant: {
      default: '',
      secondary: '',
    },
    background: {
      off: 'bg-disable',
      primary: 'bg-primary-01',
      secondary: 'bg-secondary-01',
      disabled: 'bg-disable',
    },
  },
  defaultVariants: {
    size: 'lg',
    variant: 'default',
    background: 'off',
  },
});

const toggleThumbVariants = cva(
  'absolute top-2 left-2 transform rounded-full bg-white shadow-md transition-transform duration-500',
  {
    variants: {
      size: {
        sm: 'h-12 w-12',
        md: 'h-16 w-16',
        lg: 'h-20 w-20',
        xl: 'h-24 w-24',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);

const toggleContainerVariants = cva('flex cursor-pointer flex-col items-center select-none', {
  variants: {
    disabled: {
      true: 'cursor-not-allowed opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

interface ToggleButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toggleButtonVariants> {
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleButton = ({
  checked,
  onCheckedChange,
  disabled = false,
  size,
  variant,
  background,
  className,
  ...props
}: ToggleButtonProps) => {
  const toggleHandler = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  const getBackgroundVariant = () => {
    if (disabled) {
      return 'disabled';
    }
    if (checked) {
      return background || 'primary';
    }
    return 'off';
  };

  const getThumbTransform = () => {
    if (size === 'sm') {
      return checked ? 'translate-x-12' : 'translate-x-0';
    }
    if (size === 'md') {
      return checked ? 'translate-x-16' : 'translate-x-0';
    }
    if (size === 'xl') {
      return checked ? 'translate-x-20' : 'translate-x-0';
    }
    // lg size (default)
    return checked ? 'translate-x-17' : 'translate-x-0';
  };

  return (
    <div
      className={cn(toggleContainerVariants({ disabled }), className)}
      onClick={toggleHandler}
      {...props}
    >
      {/* 토글 배경 */}
      <div
        className={cn(toggleButtonVariants({ size, variant, background: getBackgroundVariant() }))}
      >
        {/* 토글 원 */}
        <div className={cn(toggleThumbVariants({ size }), getThumbTransform())} />
      </div>
    </div>
  );
};

export default ToggleButton;
