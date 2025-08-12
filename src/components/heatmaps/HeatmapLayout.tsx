import { TIME_LABELS } from '@/constants/heatmap';
import { HeatmapPeriod, TimeSlotKey } from '@/interfaces/heatmap';

interface HeatmapLayoutProps {
  type: HeatmapPeriod;
  data?: any;
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HeatmapLayout = ({ type, data, children }: HeatmapLayoutProps) => {
  const timeKeys: TimeSlotKey[] = ['dawn', 'morning', 'afternoon', 'evening'];

  return (
    <div className="flex w-full flex-col">
      {/* 시간대 헤더 - 항상 고정 */}
      <div className="mb-12 ml-40 flex gap-x-4">
        {timeKeys.map(key => (
          <div
            key={key}
            className="text-text-04 text-body-m-16 flex h-48 w-full max-w-139 min-w-64 items-center justify-center text-center md:max-w-163 md:min-w-140 lg:max-w-164 lg:min-w-164"
          >
            <span className="whitespace-pre-line">{TIME_LABELS[key]}</span>
          </div>
        ))}
      </div>

      {/* 고정 레이아웃 - 항상 7일/6주 표시 */}
      <div className="flex flex-col gap-y-4">{children}</div>
    </div>
  );
};

export default HeatmapLayout;
