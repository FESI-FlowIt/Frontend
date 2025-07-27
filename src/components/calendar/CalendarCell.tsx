import { Goal } from '@/interfaces/calendar';
import { hexToGoalColor } from '@/lib/calendar';
import { cn } from '@/lib/utils';

interface CalendarCellProps {
  date: number;
  goals?: Goal[];
  onClick?: (date: number, goals: Goal[], event: React.MouseEvent) => void;
  className?: string;
}

const CalendarCell = ({ date, goals = [], onClick, className }: CalendarCellProps) => {
  const firstGoal = goals[0];
  const goalColorName = firstGoal ? hexToGoalColor(firstGoal.color) : null;
  const hasGoals = goals.length > 0;

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

      {firstGoal && (
        <div
          className={`text-body-16 rounded-4 bg-goal-${goalColorName} w-full truncate px-2 text-center text-white`}
        >
          {firstGoal.title}
        </div>
      )}
    </button>
  );
};

export default CalendarCell;
