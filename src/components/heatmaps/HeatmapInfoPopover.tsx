import TimerIcon from '@/assets/icons/timer.svg';
import LegendSection from '@/components/heatmaps/LegendSection';
import Popover from '@/components/ui/Popover';
import { MONTHLY_LEGEND, WEEKLY_LEGEND } from '@/constants/heatmap';
import { cn } from '@/lib/utils';

interface HeatmapInfoPopoverProps {
  onClose: () => void;
  position: { top: number; left: number };
  className?: string;
}

const HeatmapInfoPopover = ({ onClose, position, className }: HeatmapInfoPopoverProps) => {
  return (
    <Popover
      icon={<TimerIcon className="text-gray-01" width={24} height={24} fill="currentColor" />}
      title="작업 시간에 따른 히트맵 측정"
      onClose={onClose}
      className={cn('shadow-lg', className)}
      position={position}
      isOpen={true}
    >
      <div className="flex flex-row gap-76">
        <LegendSection title="[주간]" data={WEEKLY_LEGEND} />
        <LegendSection title="[월간]" data={MONTHLY_LEGEND} />
      </div>
    </Popover>
  );
};

export default HeatmapInfoPopover;
