import { IconButton } from '@/components/ui/IconButton';
import { AssignedTask, Task } from '@/interfaces/schedule';
import TaskCard from './TaskCard';

interface TimeSlotRowProps {
  time: string;
  assignedTasks: AssignedTask[];
  onDropTask: (taskId: string, time: string) => void;
  onDeleteTask: (task: Task, time: string) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function TimeSlotRow({
  time,
  assignedTasks,
  onDropTask,
  onDeleteTask,
  isFirst = false,
  isLast = false,
}: TimeSlotRowProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    onDropTask(taskId, time);
  };

  const containerClass = [
    'border-line flex h-74 w-280 flex-col items-center justify-center gap-1 border md:w-300',
    isFirst && 'rounded-t-10',
    isLast && 'rounded-b-10',
  ]
    .filter(Boolean)
    .join(' ');

  // 시간당 하나의 할 일만 표시
  const taskInThisSlot = assignedTasks.find(a => a.time === time);

  return (
    <div className="flex h-74" onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
      <div className="text-body-m-16 text-text-04 flex w-60 items-center justify-center">
        {time}
      </div>

      <div className="h-full flex-1 px-4">
        <div className={containerClass}>
          {taskInThisSlot && (
            <div
              key={`${taskInThisSlot.task.id}-${time}`}
              className="group relative h-54 w-260 md:w-280"
            >
              <TaskCard task={taskInThisSlot.task} isDraggable={false} isAssigned />
              <div className="absolute top-1/2 right-20 hidden -translate-y-1/2 items-center group-hover:flex">
                <IconButton
                  variant="close"
                  aria-label="삭제"
                  onClick={() => onDeleteTask(taskInThisSlot.task, time)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
