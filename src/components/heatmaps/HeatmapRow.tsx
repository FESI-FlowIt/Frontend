import HeatmapCell from '@/components/heatmaps/HeatmapCell';
import { HeatmapIntensity, TimeSlotKey } from '@/interfaces/heatmap';

interface HeatmapRowProps {
  rowLabel: string;
  timeSlots: Record<TimeSlotKey, { minutes: number; intensity: number }>;
}

const HeatmapRow = ({ rowLabel, timeSlots }: HeatmapRowProps) => {
  const timeKeys: TimeSlotKey[] = ['dawn', 'morning', 'afternoon', 'evening'];

  return (
    <div className="flex items-center gap-x-16">
      <div className="text-text-04 text-body-m-16 flex h-36 w-14 shrink-0 items-center justify-center">
        {rowLabel}
      </div>

      <div className="flex gap-x-4">
        {timeKeys.map(key => {
          const slot = timeSlots[key];
          return (
            <HeatmapCell
              key={key}
              minutes={slot.minutes}
              intensity={slot.intensity as HeatmapIntensity}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeatmapRow;
