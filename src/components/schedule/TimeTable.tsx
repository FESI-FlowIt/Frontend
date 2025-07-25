import ArrowNavigation from '@/components/ui/ArrowNavigation';
import { AssignedTask, Task } from './ScheduleModal';
import TimeSlotRow from './TimeSlotRow';

interface Props {
  assignedTasks: AssignedTask[];
  onDropTask: (taskId: string, time: string) => void;
  onDeleteTask: (task: Task, time: string) => void;
}

const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

export default function TimeTable({ assignedTasks, onDropTask, onDeleteTask }: Props) {
  return (
    <div className="max-h-600 w-2/3 pl-4">
      <div className="mb-16 flex justify-start pt-16 pl-16">
        <ArrowNavigation
          label="7월 8일 (화)"
          onPrev={() => console.log('이전 날짜')}
          onNext={() => console.log('다음 날짜')}
        />
      </div>
      <div className="max-h-524 overflow-y-auto pr-1">
        <div className="flex flex-col">
          {timeSlots.map(time => (
            <TimeSlotRow
              key={time}
              time={time}
              assignedTasks={assignedTasks.filter(a => a.time === time)}
              onDropTask={onDropTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
