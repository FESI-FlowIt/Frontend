'use client';

import { useState } from 'react';
import dayjs from 'dayjs';

import ArrowNavigation from '@/components/ui/ArrowNavigation';
import { AssignedTask, Task } from '@/interfaces/schedule';
import { formatScheduleDate } from '@/lib/format';
import TimeSlotRow from './TimeSlotRow';

interface TimeTableProps {
  assignedTasks: AssignedTask[];
  onDropTask: (taskId: string, time: string, date: string) => void;
  onDeleteTask: (task: Task, time: string, date: string) => void; // ✅ 수정
}

const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

export default function TimeTable({ assignedTasks, onDropTask, onDeleteTask }: TimeTableProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrev = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 1));
  };

  const handleNext = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 1));
  };

  const currentDateStr = dayjs(currentDate).format('YYYY-MM-DD');

  return (
    <div className="h-284 w-375 md:h-600 md:w-2/3 md:pl-4">
      {/* 날짜 네비게이션 */}
      <div className="mb-8 flex h-63 justify-start pt-16 pl-24">
        <div className="h-44 w-full">
          <ArrowNavigation
            label={formatScheduleDate(currentDate)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      </div>

      {/* 시간대 영역 */}
      <div className="h-220 overflow-y-auto pr-1 md:h-524">
        <div className="flex flex-col">
          {timeSlots.map((time, index) => (
            <TimeSlotRow
              key={time}
              time={time}
              date={currentDateStr}
              assignedTasks={assignedTasks.filter(
                a => a.time === time && a.date === currentDateStr,
              )}
              onDropTask={taskId => onDropTask(taskId, time, currentDateStr)}
              onDeleteTask={(task, time) => onDeleteTask(task, time, currentDateStr)} // ✅ 수정
              isFirst={index === 0}
              isLast={index === timeSlots.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
