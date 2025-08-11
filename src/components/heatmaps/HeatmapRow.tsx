import HeatmapCell from '@/components/heatmaps/HeatmapCell';
import { HeatmapIntensity, TimeSlotKey } from '@/interfaces/heatmap';

interface HeatmapRowProps {
  rowLabel: string;
  timeSlots: Record<TimeSlotKey, { minutes: number; intensity: number }> | null; // null 허용
}

const HeatmapRow = ({ rowLabel, timeSlots }: HeatmapRowProps) => {
  const timeKeys: TimeSlotKey[] = ['dawn', 'morning', 'afternoon', 'evening'];

  return (
    <div className="flex items-center">
      <div className="text-text-04 text-body-m-16 flex h-36 w-31 shrink-0 items-center md:h-43">
        {rowLabel}
      </div>

      <div className="flex w-full gap-x-4">
        {timeKeys.map(key => {
          // 데이터가 있으면 실제 값, 없으면 기본값
          const slot = timeSlots?.[key];

          return (
            <HeatmapCell
              key={key}
              minutes={slot?.minutes || 0}
              intensity={(slot?.intensity as HeatmapIntensity) || 0}
              isEmpty={!slot}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeatmapRow;
