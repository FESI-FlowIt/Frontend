import { Goal } from '@/interfaces/calendar';
import { cn } from '@/lib/utils';

interface CalendarCellProps {
  date: number;
  goals?: Goal[];
  onClick?: () => void;
  className?: string;
}

const CalendarCell = ({ date, goals = [], onClick, className }: CalendarCellProps) => {
  const firstGoal = goals[0];

  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-4 hover:bg-tertiary-01 flex h-44 w-40 cursor-pointer flex-col items-center transition md:h-44 md:w-88',
        className,
      )}
    >
      <span className="text-body-m-16 text-text-03 self-center">{date}</span>

      {firstGoal && (
        <div
          className="text-body-16 rounded-4 w-full truncate px-2 text-center text-white"
          style={{ backgroundColor: firstGoal.color }}
        >
          {firstGoal.title}
        </div>
      )}
    </button>
  );
};

export default CalendarCell;
