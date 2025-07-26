import { IconButton } from '@/components/ui/IconButton';

import { AssignedTask, Task } from './ScheduleModal';
import TaskCard from './TaskCard';

interface TimeSlotRowProps {
  time: string;
  assignedTasks: AssignedTask[];
  onDropTask: (taskId: string, time: string) => void;
  onDeleteTask: (task: Task, time: string) => void;
}

export default function TimeSlotRow({
  time,
  assignedTasks,
  onDropTask,
  onDeleteTask,
}: TimeSlotRowProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    onDropTask(taskId, time);
  };

  return (
    <div className="flex h-74" onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
      {/* 시간 텍스트 */}
      <div className="text-body-m-16 text-text-04 flex w-60 items-center justify-center">
        {time}
      </div>

      {/* 드롭 영역 */}
      <div className="h-full flex-1 px-4">
        <div className="border-line flex h-74 w-280 flex-col items-center justify-center gap-1 border md:w-300">
          {assignedTasks.map(({ task }) => (
            <div key={task.id} className="group relative h-54 w-260 md:w-280">
              <TaskCard task={task} isDraggable={false} isAssigned />
              <div className="absolute top-1/2 right-20 hidden -translate-y-1/2 items-center group-hover:flex">
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
