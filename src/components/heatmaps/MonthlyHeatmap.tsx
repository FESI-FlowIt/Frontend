import HeatmapLayout from '@/components/heatmaps/HeatmapLayout';
import HeatmapRow from '@/components/heatmaps/HeatmapRow';
import { WEEK_ORDER_LABELS } from '@/constants/heatmap';
import { MonthlyHeatmapResponse } from '@/interfaces/heatmap';

interface MonthlyHeatmapProps {
  data?: MonthlyHeatmapResponse['data'];
}

const MonthlyHeatmap = ({ data }: MonthlyHeatmapProps) => {
  // 항상 6주 레이아웃 생성
  const rows = WEEK_ORDER_LABELS.map((label, index) => {
    // 해당 주차의 데이터 찾기
    const weekData = data?.days?.find(week => week.week_of_month === index + 1);

    return <HeatmapRow key={label} rowLabel={label} timeSlots={weekData?.time_slots || null} />;
  });

  return (
    <HeatmapLayout type="monthly" data={data}>
      {rows}
    </HeatmapLayout>
  );
};

export default MonthlyHeatmap;
