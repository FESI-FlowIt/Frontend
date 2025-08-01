import { cva, VariantProps } from 'class-variance-authority';
import { createPortal } from 'react-dom';

import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';

const popoverVariants = cva(
  'rounded-20 border-line fixed z-50 flex w-fit flex-col border-1 bg-white shadow-xl',
  {
    variants: {
      variant: {
        heatmap: 'h-282 w-320 gap-28 p-20',
        calendar: 'w-343 gap-0 px-0 py-20 md:w-520',
      },
    },
    defaultVariants: {
      variant: 'heatmap',
    },
  },
);

const titleVariants = cva('text-text-02', {
  variants: {
    variant: {
      heatmap: 'text-body-b-16',
      calendar: 'text-body-sb-20 h-52 px-20 py-14',
    },
  },
  defaultVariants: {
    variant: 'heatmap',
  },
});

interface PopoverProps extends VariantProps<typeof popoverVariants> {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
  isOpen: boolean;
  position: { top: number; left: number };
}

const Popover = ({
  icon,
  title,
  children,
  className,
  onClose,
  isOpen,
  position,
  variant,
}: PopoverProps) => {
  if (!isOpen) return null;

  const popoverContent = (
    <div
      className={cn(popoverVariants({ variant }), className)}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div className={titleVariants({ variant })}>{title}</div>
        </div>
        <IconButton
          variant="close"
          onClick={onClose}
          aria-label="팝오버 닫기"
          className={variant === 'calendar' ? 'mr-20' : ''}
        />
      </div>

      {/* Content */}
      <div className="flex-1">{children}</div>
    </div>
  );

  return createPortal(popoverContent, document.body);
};

export default Popover;
