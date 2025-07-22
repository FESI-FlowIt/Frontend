import HeatmapLayout from '@/components/heatmaps/HeatmapLayout';
import HeatmapRow from '@/components/heatmaps/HeatmapRow';
import { WEEK_ORDER_LABELS } from '@/constants/heatmap';
import { MonthlyHeatmapResponse, TimeSlotKey } from '@/interfaces/heatmap';

interface MonthlyHeatmapProps {
  data: MonthlyHeatmapResponse['data'];
}

const MonthlyHeatmap = ({ data }: MonthlyHeatmapProps) => {
  const timeKeys: TimeSlotKey[] = ['dawn', 'morning', 'afternoon', 'evening'];

  return (
    <HeatmapLayout timeKeys={timeKeys}>
      {data.days.map((week, i) => (
        <HeatmapRow
          key={week.week_of_month}
          rowLabel={WEEK_ORDER_LABELS[i]}
          timeSlots={week.time_slots}
        />
      ))}
    </HeatmapLayout>
  );
};

export default MonthlyHeatmap;
