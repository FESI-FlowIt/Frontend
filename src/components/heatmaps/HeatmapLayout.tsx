import { TIME_LABELS } from '@/constants/heatmap';
import { TimeSlotKey } from '@/interfaces/heatmap';

interface HeatmapLayoutProps {
  timeKeys: TimeSlotKey[];
  children: React.ReactNode;
}

const HeatmapLayout = ({ timeKeys, children }: HeatmapLayoutProps) => {
  return (
    <div className="flex flex-col">
      {/* 시간대 헤더 */}
      <div className="mb-12 ml-40 flex gap-x-4">
        {timeKeys.map(key => (
          <div
            key={key}
            className="text-text-04 text-body-m-16 flex h-48 w-64 items-center justify-center text-center md:w-140 lg:w-160"
          >
            <span className="whitespace-pre-line">{TIME_LABELS[key]}</span>
          </div>
        ))}
      </div>

      {/* 요일 or 주차별 행 */}
      <div className="flex flex-col gap-y-4">{children}</div>
    </div>
  );
};

export default HeatmapLayout;
