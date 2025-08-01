import { cva, VariantProps } from 'class-variance-authority';

import { HeatmapIntensity } from '@/interfaces/heatmap';
import { formatMinutesToHourString } from '@/lib/format';
import { cn } from '@/lib/utils';

const heatmapCellVariants = cva(
  'text-body-m-16 rounded-8 flex h-36 w-64 items-center justify-center md:w-120 lg:w-160',
  {
    variants: {
      intensity: {
        0: 'bg-heatmap-0 text-inactive',
        1: 'bg-heatmap-1 text-inactive',
        2: 'bg-heatmap-2 text-inactive',
        3: 'bg-heatmap-3 text-inactive',
        4: 'bg-heatmap-4 text-inactive border-heatmap-accent border-2',
      },
    },
    defaultVariants: {
      intensity: 0,
    },
  },
);

interface HeatmapCellProps extends VariantProps<typeof heatmapCellVariants> {
  minutes: number;
  intensity: HeatmapIntensity;
  className?: string;
}

const HeatmapCell = ({ minutes, intensity = 0, className }: HeatmapCellProps) => {
  return (
    <div className={cn(heatmapCellVariants({ intensity }), className)}>
      <span className="text-inactive text-body-m-16">{formatMinutesToHourString(minutes)}h</span>
    </div>
  );
};

export default HeatmapCell;
