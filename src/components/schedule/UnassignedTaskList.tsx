import TodoIcon from '@/../public/assets/icons/todoIcon.svg';
import TaskCard from './TaskCard';
import { Task } from './ScheduleModal';

interface Props {
  tasks: Task[];
}

export default function UnassignedTaskList({ tasks }: Props) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  return (
    <div className="bg-background h-600 w-320 flex-shrink-0 overflow-y-auto pt-16">
      <div className="mx-auto w-full max-w-[280px]">
        <div className="mb-24">
          <div className="mb-8 flex items-center gap-8">
            <TodoIcon className="h-24 w-24" />
            <p className="text-body-sb-20 text-text-02">미배치 할 일</p>
          </div>
          <p className="text-body-m-16 text-text-03">드래그해서 시간대에 배치하세요! 👉🏻</p>
        </div>
        {tasks.map(task => (
          <div
            key={task.id}
            draggable
            onDragStart={e => handleDragStart(e, task.id)}
            className="mb-4"
          >
            <TaskCard task={task} showHover isDraggable />
          </div>
        ))}
      </div>
    </div>
  );
}
