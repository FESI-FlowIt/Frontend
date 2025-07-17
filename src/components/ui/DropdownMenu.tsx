'use client';

import React, { useEffect, useRef } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';

const dropdownVariants = cva('fixed z-50 rounded-lg border border-gray-200 bg-white shadow-lg', {
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

export interface DropdownPortalProps extends VariantProps<typeof dropdownVariants> {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | HTMLButtonElement | null>;
  className?: string;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  matchTriggerWidth?: boolean;
}

const DropdownPortal = ({
  children,
  isOpen,
  onClose,
  triggerRef,
  size,
  animation,
  shadow,
  className,
  position = 'bottom-left',
}: DropdownPortalProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // 위치 계산
  const getPosition = () => {
    if (!triggerRef.current) return { top: 0, left: 0 };

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    const triggerWidth = size === 'full' ? rect.width : undefined;

    switch (position) {
      case 'bottom-left':
        return {
          top: rect.bottom + scrollY + 4,
          left: rect.left + scrollX,
          ...(triggerWidth && { width: triggerWidth }),
        };
      case 'bottom-right':
        return {
          top: rect.bottom + scrollY + 4,
          left: rect.right + scrollX,
          transform: 'translateX(-100%)',
          ...(triggerWidth && { width: triggerWidth }),
        };
      case 'top-left':
        return {
          top: rect.top + scrollY - 4,
          left: rect.left + scrollX,
          transform: 'translateY(-100%)',
          ...(triggerWidth && { width: triggerWidth }),
        };
      case 'top-right':
        return {
          top: rect.top + scrollY - 4,
          left: rect.right + scrollX,
          transform: 'translateX(-100%) translateY(-100%)',
          ...(triggerWidth && { width: triggerWidth }),
        };
      default:
        return {
          top: rect.bottom + scrollY + 4,
          left: rect.left + scrollX,
          ...(triggerWidth && { width: triggerWidth }),
        };
    }
  };

  if (!isOpen) return null;

  const positionStyle = getPosition();

  return createPortal(
    <div
      ref={dropdownRef}
      className={cn(dropdownVariants({ size, animation, shadow }), className)}
      style={{
        top: positionStyle.top,
        left: positionStyle.left,
        ...(positionStyle.width && { width: positionStyle.width }),
      }}
      role="menu"
      aria-orientation="vertical"
    >
      {children}
    </div>,
    document.body,
  );
};

export default DropdownPortal;
