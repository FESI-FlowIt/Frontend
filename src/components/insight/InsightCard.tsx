import { cn } from '@/lib/utils';

interface InsightCardProps {
  variant: 'empty' | 'weekly' | 'monthly';
  items?: React.ReactNode[];
  className?: string;
}

import TimerIcon from '@/assets/icons/timer.svg';

const InsightCard = ({ variant, items = [], className }: InsightCardProps) => {
  const baseClasses =
    'rounded-20 flex w-full flex-col py-12 px-12 md:px-20 bg-insightContainer gap-12 h-full';

  if (variant === 'empty') {
    return (
      <div className={cn(baseClasses, 'items-center justify-center text-center', className)}>
        <div className="text-body-m-16 text-text-03 flex flex-col items-center gap-8">
          <TimerIcon className="text-inactive" width={32} height={32} fill="currentColor" />

          <p>
            이번 주 작업 기록이 없어 <br className="md:hidden" />
            인사이트를 제공할 수 없어요 :(
          </p>
          <p>작업을 시작해보세요!</p>
        </div>
      </div>
    );
  }

  const title =
    variant === 'weekly' ? '[이번 주 목표 달성 인사이트]' : '[이번 달 목표 달성 인사이트]';

  return (
    <div className={cn(baseClasses, className)}>
      <div className="text-text-01 text-body-b-16">{title}</div>
      <div className="text-body-16 text-text-01 flex flex-col gap-10 leading-tight">
        {items.map((item, idx) => (
          <p key={idx}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default InsightCard;
