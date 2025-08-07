'use client';

import ArrowNavigation from '@/components/ui/ArrowNavigation';
import { AssignedTask, Task } from '@/interfaces/schedule';
import { formatScheduleDate } from '@/lib/format';

import TimeSlotRow from './TimeSlotRow';

interface TimeTableProps {
  selectedDate: string;
  onPrevDate: () => void;
  onNextDate: () => void;
  assignedTasks: AssignedTask[];
  onDropTask: (taskId: string, time: string, date: string) => void;
  onDeleteTask: (task: Task, time: string, date: string) => void;
}

const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

export default function TimeTable({
  selectedDate,
  onPrevDate,
  onNextDate,
  assignedTasks,
  onDropTask,
  onDeleteTask,
}: TimeTableProps) {
  return (
    <div className="h-284 w-375 md:h-600 md:w-2/3 md:pl-4">
      <div className="mb-8 flex h-63 justify-start pt-16 pl-24">
        <div className="h-44 w-full">
          <ArrowNavigation
            label={formatScheduleDate(selectedDate)}
            onPrev={onPrevDate}
            onNext={onNextDate}
          />
        </div>
      </div>

      <div className="h-220 overflow-y-auto pr-1 md:h-524">
        <div className="flex flex-col">
          {timeSlots.map((time, index) => (
            <TimeSlotRow
              key={time}
              time={time}
              date={selectedDate}
              assignedTasks={assignedTasks.filter(a => a.time === time && a.date === selectedDate)}
              onDropTask={taskId => onDropTask(taskId, time, selectedDate)}
              onDeleteTask={(task, time) => onDeleteTask(task, time, selectedDate)}
              isFirst={index === 0}
              isLast={index === timeSlots.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
