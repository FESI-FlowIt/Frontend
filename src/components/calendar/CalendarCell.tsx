import { Goal } from '@/interfaces/calendar';
import { getGoalBackgroundColorClass } from '@/lib/goalColors';
import { cn } from '@/lib/utils';

interface CalendarCellProps {
  date: number;
  goals?: Goal[];
  onClick?: (date: number, goals: Goal[], event: React.MouseEvent) => void;
  className?: string;
}

const CalendarCell = ({ date, goals = [], onClick, className }: CalendarCellProps) => {
  const hasGoals = goals.length > 0;
  const firstGoal = goals[0];
  const goalColorName = firstGoal ? getGoalBackgroundColorClass(firstGoal.color) : null;

  const handleClick = (event: React.MouseEvent) => {
    if (hasGoals && onClick) {
      onClick(date, goals, event);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'rounded-4 flex h-40 w-full min-w-40 cursor-pointer flex-col items-center p-1 transition md:max-h-44 md:max-w-84 lg:h-40 lg:w-71',
        hasGoals && 'hover:bg-tertiary-01',
        className,
      )}
    >
      <span className="text-body-m-16 text-text-03 h-20 self-center">{date}</span>

      {hasGoals && (
        <div
          className={`text-body-16 rounded-4 ${goalColorName} flex w-full items-center justify-center truncate px-2 text-center text-white`}
        >
          {goals.length}
        </div>
      )}
    </button>
  );
};

export default CalendarCell;
