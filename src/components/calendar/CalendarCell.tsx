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
  const goalName = goals.length === 1 ? firstGoal.title : goals.length;
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
        'rounded-4 flex h-44 w-40 cursor-pointer flex-col items-center transition md:h-44 md:w-88',
        hasGoals && 'hover:bg-tertiary-01',
        className,
      )}
    >
      <span className="text-body-m-16 text-text-03 self-center">{date}</span>

      {hasGoals && (
        <div
          className={`text-body-16 rounded-4 ${goalColorName} w-full truncate px-2 text-center text-white`}
        >
          {goalName}
        </div>
      )}
    </button>
  );
};

export default CalendarCell;
