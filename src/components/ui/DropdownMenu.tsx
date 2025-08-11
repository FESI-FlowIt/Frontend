'use client';

import React, { useEffect } from 'react';

import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  size as floatingSize,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const dropdownVariants = cva('rounded-b-[20px] border shadow-lg', {
  variants: {
    size: {
      sm: 'max-w-xs min-w-32',
      md: 'max-w-sm min-w-48',
      lg: 'max-w-md min-w-64',
      auto: 'w-auto max-w-xs',
      goalListFilter: 'max-w-148',
      todo: 'max-w-520',
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
  position?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
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
  position = 'bottom-start',
  matchTriggerWidth = false,
  zIndex = 9999,
}: DropdownMenuProps) => {
  // Floating UI 설정
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: open => {
      if (!open) onClose();
    },
    middleware: [
      offset(16), // 16px 간격
      flip(), // 화면 경계에 닿으면 위치 자동 조정
      shift(), // 화면 밖으로 나가지 않도록 이동
      ...(matchTriggerWidth
        ? [
            floatingSize({
              apply({ rects, elements }) {
                Object.assign(elements.floating.style, {
                  width: `${rects.reference.width}px`,
                });
              },
            }),
          ]
        : []),
    ],
    placement: position,
    whileElementsMounted: autoUpdate, // 자동 위치 업데이트
  });

  // 인터랙션 설정
  const dismiss = useDismiss(context, {
    outsidePress: true,
    escapeKey: true,
  });

  const { getFloatingProps } = useInteractions([dismiss]);

  // triggerRef를 Floating UI의 reference로 설정
  useEffect(() => {
    if (triggerRef.current) {
      refs.setReference(triggerRef.current);
    }
  }, [refs, triggerRef]);

  if (!isOpen) return null;

  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        style={{
          ...floatingStyles,
          zIndex,
        }}
        className={cn(
          dropdownVariants({ size, animation, shadow }),
          'border-none bg-white',
          className,
        )}
        {...getFloatingProps()}
        role="menu"
        aria-orientation="vertical"
      >
        {children}
      </div>
    </FloatingPortal>
  );
};

export default DropdownMenu;
