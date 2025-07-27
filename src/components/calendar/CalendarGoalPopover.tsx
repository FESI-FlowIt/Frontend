import { useRouter } from 'next/navigation';

import Popover from '@/components/ui/Popover';
import { Goal } from '@/interfaces/calendar';
import { hexToGoalColor } from '@/lib/calendar';
import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/utils';

interface CalendarGoalPopoverProps {
  month: number;
  date: number;
  goals: Goal[];
  position: { top: number; left: number };
  onClose: () => void;
  isOpen: boolean;
  className?: string;
}

const CalendarGoalPopover = ({
  month,
  date,
  goals,
  position,
  onClose,
  isOpen,
  className,
}: CalendarGoalPopoverProps) => {
  const router = useRouter();

  const handleGoalClick = (goalId: string) => {
    router.push(ROUTES.GOALS.DETAIL(goalId));
    onClose();
  };

  return (
    <Popover
      title={`${month}월 ${date}일 마감`}
      isOpen={isOpen}
      position={position}
      onClose={onClose}
      variant="calendar"
    >
      <div className={cn('flex flex-col', className)}>
        {goals.map(goal => (
          <div
            key={goal.id}
            className="hover:bg-tertiary-01-press flex h-52 cursor-pointer items-center gap-20 px-20"
            onClick={() => handleGoalClick(goal.id)}
          >
            <div
              className={`h-12 w-12 flex-shrink-0 rounded-full bg-goal-${hexToGoalColor(goal.color)}`}
            />
            <span className="text-text-02 text-body-m-20 flex-1">{goal.title}</span>
          </div>
        ))}
      </div>
    </Popover>
  );
};

export default CalendarGoalPopover;
