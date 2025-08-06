'use client';

import TodoIcon from '@/assets/icons/todo.svg';
import { Task } from '@/interfaces/schedule';

import TaskCard from './TaskCard';

interface UnassignedTaskListProps {
  tasks: Task[];
}

export default function UnassignedTaskList({ tasks }: UnassignedTaskListProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  return (
    <div className="bg-background mx-auto h-283 w-375 flex-shrink-0 pt-16 md:mx-0 md:h-600 md:w-320">
      <div className="mx-auto flex h-full w-full max-w-375 flex-col md:max-w-320">
        {/* 상단 안내 영역 */}
        <div className="mb-24 shrink-0 px-20">
          <div className="mb-8 flex items-center gap-8">
            <TodoIcon className="text-gray-01" width={24} height={24} fill="currentColor" />
            <p className="text-body-sb-20 text-text-02">미배치 할 일</p>
          </div>
          <p className="text-body-m-16 text-text-03">드래그해서 시간대에 배치하세요! 👉🏻</p>
        </div>

        {/* 카드 리스트 */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="flex flex-col gap-8 px-20 pr-4">
            {tasks.map(task => (
              <div key={task.id} draggable onDragStart={e => handleDragStart(e, task.id)}>
                <TaskCard task={task} isDraggable />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
