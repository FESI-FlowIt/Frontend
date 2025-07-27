import ArrowNavigation from '@/components/ui/ArrowNavigation';
import { AssignedTask, Task } from '@/interfaces/schedule';

import TimeSlotRow from './TimeSlotRow';

interface TimeTableProps {
  assignedTasks: AssignedTask[];
  onDropTask: (taskId: string, time: string) => void;
  onDeleteTask: (task: Task, time: string) => void;
}

const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

export default function TimeTable({ assignedTasks, onDropTask, onDeleteTask }: TimeTableProps) {
  return (
    <div className="h-284 w-375 md:h-600 md:w-2/3 md:pl-4">
      {/*  날짜 */}
      <div className="mb-8 flex h-63 justify-start pt-16 pl-24">
        <div className="h-44 w-213">
          <ArrowNavigation label="7월 8일 (화)" onPrev={() => {}} onNext={() => {}} />
        </div>
      </div>

      {/* 시간대 영역 */}
      <div className="h-220 overflow-y-auto pr-1 md:h-524">
        <div className="flex flex-col">
          {timeSlots.map((time, index) => (
            <TimeSlotRow
              key={time}
              time={time}
              assignedTasks={assignedTasks.filter(a => a.time === time)}
              onDropTask={onDropTask}
              onDeleteTask={onDeleteTask}
              isFirst={index === 0}
              isLast={index === timeSlots.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
