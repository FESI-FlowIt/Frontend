import { cn } from '@/lib/utils';

interface LegendItem {
  intensity: number;
  label: string;
  bgClass: string;
}

interface LegendSectionProps {
  title: string;
  data: LegendItem[];
}

const LegendSection = ({ title, data }: LegendSectionProps) => (
  <div className="flex flex-col gap-16">
    <h3 className="text-body-b-16 text-text-02">{title}</h3>
    <div className="flex flex-col gap-8">
      {data.map(item => (
        <div key={item.intensity} className="flex items-center gap-8">
          <div className={cn('h-12 w-12 rounded-full', item.bgClass)} />
          <span className="text-body-m-16 text-text-03 whitespace-nowrap">{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default LegendSection;
