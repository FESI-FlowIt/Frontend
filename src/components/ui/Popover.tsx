import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';

interface PopoverProps {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
}

const Popover = ({ icon, title, children, className, onClose }: PopoverProps) => {
  return (
    <div
      className={cn(
        'bg-ui-background rounded-20 border-line flex w-fit flex-col gap-28 border-1 p-20',
        className,
      )}
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
};

export default Popover;
