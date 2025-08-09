import { cva, VariantProps } from 'class-variance-authority';

import { HeatmapIntensity } from '@/interfaces/heatmap';
import { formatMinutesToHourString } from '@/lib/format';
import { cn } from '@/lib/utils';

const heatmapCellVariants = cva(
  'text-body-m-16 rounded-8 sm:w-min-64 sm:w-max-139 md:w-min-140 md:w-max-163 lg:w-min-164 lg:w-max-164 flex h-36 w-full items-center justify-center md:h-43',
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
