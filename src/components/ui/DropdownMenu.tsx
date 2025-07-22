'use client';

import React, { useEffect, useRef, useState } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const dropdownVariants = cva('absolute rounded-lg border shadow-lg', {
  variants: {
    size: {
      sm: 'max-w-xs min-w-32',
      md: 'max-w-sm min-w-48',
      lg: 'max-w-md min-w-64',
      auto: 'w-auto max-w-xs',
      full: 'w-auto',
    },
    animation: {
      none: '',
      fade: 'animate-in fade-in-0 zoom-in-95',
      slide: 'animate-in slide-in-from-top-2',
      scale: 'animate-in zoom-in-95',
    },
    shadow: {
      sm: 'shadow-sm',
      md: 'shadow-lg',
      lg: 'shadow-xl',
    },
  },
  defaultVariants: {
    size: 'md',
    animation: 'fade',
    shadow: 'md',
  },
});

export interface DropdownMenuProps extends VariantProps<typeof dropdownVariants> {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | HTMLButtonElement | null>;
  className?: string;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  matchTriggerWidth?: boolean;
  zIndex?: number;
}

const DropdownMenu = ({
  children,
  isOpen,
  onClose,
  triggerRef,
  size,
  animation,
  shadow,
  className,
  position = 'bottom-left',
  matchTriggerWidth = false,
  zIndex = 50, // 기본값 50
}: DropdownMenuProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 및 키보드 이벤트 처리
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'top-full left-0 mt-4';
      case 'bottom-right':
        return 'top-full right-0 mt-4';
      case 'top-left':
        return 'bottom-full left-0 mb-4';
      case 'top-right':
        return 'bottom-full right-0 mb-4';
      default:
        return 'top-full left-0 mt-4';
    }
  };

  const widthStyle =
    matchTriggerWidth && triggerRef.current ? { width: triggerRef.current.offsetWidth } : {};

  return (
    <div
      ref={dropdownRef}
      className={cn(
        dropdownVariants({ size, animation, shadow }),
        'border-line bg-white',
        getPositionClasses(),
        className,
      )}
      style={{
        zIndex,
        ...widthStyle,
      }}
      role="menu"
      aria-orientation="vertical"
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
