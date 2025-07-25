import TaskCard from './TaskCard';
import { AssignedTask, Task } from './ScheduleModal';
import { IconButton } from '@/components/ui/IconButton';

interface Props {
  time: string;
  assignedTasks: AssignedTask[];
  onDropTask: (taskId: string, time: string) => void;
  onDeleteTask: (task: Task, time: string) => void;
}

export default function TimeSlotRow({ time, assignedTasks, onDropTask, onDeleteTask }: Props) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    onDropTask(taskId, time);
  };

  return (
    <div className="flex h-[74px]" onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
      <div className="text-body-m-16 text-text-04 flex w-[60px] items-center justify-center">
        {time}
      </div>
      <div className="h-full flex-1 px-4">
        <div className="border-line flex h-full w-full flex-col items-center justify-center gap-1 border">
          {assignedTasks.map(({ task }) => (
            <div key={task.id} className="group relative h-[54px] w-[280px]">
              <TaskCard task={task} isDraggable={false} isAssigned />
              <div className="absolute top-0 right-2 bottom-0 hidden items-center group-hover:flex">
                <IconButton
                  variant="close"
                  aria-label="삭제"
                  onClick={() => onDeleteTask(task, time)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
