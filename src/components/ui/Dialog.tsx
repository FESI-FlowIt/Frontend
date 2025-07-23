'use client';

import { useEffect } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';

const dialogOverlayVariants = cva('fixed inset-0 z-[100] flex items-center justify-center', {
  variants: {
    overlay: {
      default: 'bg-black/50 backdrop-blur-sm',
      dark: 'bg-black/70 backdrop-blur-sm',
      light: 'bg-black/30 backdrop-blur-sm',
    },
  },
  defaultVariants: {
    overlay: 'default',
  },
});

const dialogContentVariants = cva('relative bg-white shadow-xl', {
  variants: {
    size: {
      default: 'h-256 w-402',
    },
    padding: {
      default: 'px-20 py-40',
    },
    margin: {
      default: 'm-16',
    },
    rounded: {
      default: 'rounded-3xl',
      none: 'rounded-none',
    },
    animation: {
      none: '',
    },
  },
  defaultVariants: {
    size: 'default',
    padding: 'default',
    margin: 'default',
    rounded: 'default',
    animation: 'none',
  },
});

export interface DialogProps extends VariantProps<typeof dialogContentVariants> {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  overlay?: VariantProps<typeof dialogOverlayVariants>['overlay'];
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

const Dialog = ({
  isOpen,
  onClose,
  children,
  size,
  padding,
  margin,
  rounded,
  animation,
  overlay = 'default',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
}: DialogProps) => {
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={dialogOverlayVariants({ overlay })}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className={cn(
          dialogContentVariants({
            size,
            animation,
            padding,
            margin,
            rounded,
          }),
          className,
        )}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Dialog;
