'use client';

import React, { useEffect, useState } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';

const modalOverlayVariants = cva(
  'fixed inset-0 flex items-center justify-center transition-opacity duration-300',
  {
    variants: {
      overlay: {
        default: 'bg-black/50',
        dark: 'bg-black/70',
        light: 'bg-black/30',
      },
      layer: {
        base: '',
        stacked: 'z-60',
      },
    },
    defaultVariants: {
      overlay: 'default',
    },
  },
);

const modalContentVariants = cva(
  'relative scale-100 transform rounded-3xl bg-white shadow-2xl transition-all duration-300',
  {
    variants: {
      size: {
        goal: 'h-552 w-600',
        todo: 'h-auto w-600',
        link: 'h-auto w-520',
        auth: 'h-256 w-402',
        timer: 'h-762 w-600',
        schedule: 'h-812 w-375 md:h-800 md:w-724',
      },
      padding: {
        default: 'p-40',
        auth: 'p-20',
        none: '',
      },
      margin: {
        default: 'm-16',
      },
      rounded: {
        default: 'rounded-3xl',
        none: 'rounded-none',
        auth: 'rounded-20',
        schedule: 'rounded-24',
      },
      animation: {
        none: '',
      },
    },
    defaultVariants: {
      size: 'todo',
      padding: 'default',
      margin: 'default',
      rounded: 'default',
      animation: 'none',
    },
  },
);

export interface ModalProps extends VariantProps<typeof modalContentVariants> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  overlay?: VariantProps<typeof modalOverlayVariants>['overlay'];
  layer?: VariantProps<typeof modalOverlayVariants>['layer'];
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  size,
  padding,
  margin,
  rounded,
  animation,
  overlay = 'default',
  layer = 'base',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ESC 키 처리
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  if (!mounted || !isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return createPortal(
    <div className={modalOverlayVariants({ overlay, layer })} onClick={handleOverlayClick}>
      <div
        className={cn(
          modalContentVariants({
            size,
            padding,
            margin,
            rounded,
            animation,
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

export default Modal;
