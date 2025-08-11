import HeatmapLayout from '@/components/heatmaps/HeatmapLayout';
import HeatmapRow from '@/components/heatmaps/HeatmapRow';
import { WEEKDAY_LABELS } from '@/constants/heatmap';
import { WeeklyHeatmapResponse } from '@/interfaces/heatmap';

interface WeeklyHeatmapProps {
  data?: WeeklyHeatmapResponse['data'];
}

const WeeklyHeatmap = ({ data }: WeeklyHeatmapProps) => {
  // 항상 7일 레이아웃 생성
  const rows = WEEKDAY_LABELS.map((label, index) => {
    // 해당 요일의 데이터 찾기
    const dayData = data?.days?.[index];

    return <HeatmapRow key={label} rowLabel={label} timeSlots={dayData?.time_slots || null} />;
  });

  return (
    <HeatmapLayout type="weekly" data={data}>
      {rows}
    </HeatmapLayout>
  );
};

export default WeeklyHeatmap;
