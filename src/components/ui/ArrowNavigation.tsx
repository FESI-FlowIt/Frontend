import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';

interface ArrowNavigationProps {
  label: string;
  onPrev: () => void;
  onNext: () => void;
  isDisabledPrev?: boolean;
  isDisabledNext?: boolean;
  className?: string;
}

const ArrowNavigation = ({
  label,
  onPrev,
  onNext,
  isDisabledPrev = false,
  isDisabledNext = false,
  className,
}: ArrowNavigationProps) => {
  return (
    <div className={cn('flex w-fit items-center justify-between gap-12', className)}>
      <IconButton
        variant="prev"
        aria-label="이전"
        onClick={onPrev}
        disabled={isDisabledPrev}
        className="disabled:opacity-30"
      />
      <span className="text-body-b-16 md:text-body-sb-20 text-text-02">{label}</span>
      <IconButton
        variant="next"
        aria-label="다음"
        onClick={onNext}
        disabled={isDisabledNext}
        className="disabled:opacity-30"
      />
    </div>
  );
};

export default ArrowNavigation;
