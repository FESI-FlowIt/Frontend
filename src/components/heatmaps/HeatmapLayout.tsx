import { TIME_LABELS } from '@/constants/heatmap';
import { TimeSlotKey } from '@/interfaces/heatmap';

interface HeatmapLayoutProps {
  timeKeys: TimeSlotKey[];
  children: React.ReactNode;
}

const HeatmapLayout = ({ timeKeys, children }: HeatmapLayoutProps) => {
  return (
    <div className="flex w-full flex-col">
      {/* 시간대 헤더 */}
      <div className="mb-12 ml-40 flex gap-x-4">
        {timeKeys.map(key => (
          <div
            key={key}
            className="text-text-04 text-body-m-16 sm:w-min-64 sm:w-max-139 md:w-min-140 md:w-max-163 lg:w-min-164 lg:w-max-164 flex h-48 w-full items-center justify-center text-center"
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
