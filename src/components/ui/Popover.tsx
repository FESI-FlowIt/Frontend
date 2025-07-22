import { createPortal } from 'react-dom';

import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';

interface PopoverProps {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
  isOpen: boolean;
  position: { top: number; left: number };
}

const Popover = ({ icon, title, children, className, onClose, isOpen, position }: PopoverProps) => {
  if (!isOpen) return null;

  const popoverContent = (
    <div
      className={cn(
        'bg-ui-background rounded-20 border-line fixed z-50 flex w-fit flex-col gap-28 border-1 p-20',
        className,
      )}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div className="text-text-02 text-body-b-16">{title}</div>
        </div>
        <IconButton variant="close" onClick={onClose} aria-label="팝오버 닫기" />
      </div>

      {/* Content */}
      <div className="flex-1">{children}</div>
    </div>
  );

  return createPortal(popoverContent, document.body);
};

export default Popover;
