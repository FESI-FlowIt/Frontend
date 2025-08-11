import HeatmapLayout from '@/components/heatmaps/HeatmapLayout';
import HeatmapRow from '@/components/heatmaps/HeatmapRow';
import { WEEKDAY_LABELS } from '@/constants/heatmap';
import { TimeSlotKey, WeeklyHeatmapResponse } from '@/interfaces/heatmap';

interface WeeklyHeatmapProps {
  data: WeeklyHeatmapResponse['data'];
}

const WeeklyHeatmap = ({ data }: WeeklyHeatmapProps) => {
  const timeKeys: TimeSlotKey[] = ['dawn', 'morning', 'afternoon', 'evening'];

  return (
    <HeatmapLayout timeKeys={timeKeys}>
      {data.map((day, i) => (
        <HeatmapRow key={day.date} rowLabel={WEEKDAY_LABELS[i]} timeSlots={day.time_slots} />
      ))}
    </HeatmapLayout>
  );
};

export default WeeklyHeatmap;
