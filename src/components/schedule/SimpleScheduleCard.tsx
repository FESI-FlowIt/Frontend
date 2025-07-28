'use client';

import { useState } from 'react';

import ScheduleIcon from '@/../public/assets/icons/scheduleIcon.svg';
import { Button } from '@/components/ui/Button';
import type { AssignedTask } from '@/interfaces/schedule';
import { scheduleRes } from '@/mocks/mockResponses/schedule/scheduleResponse';

import ScheduleModal from './ScheduleModal';

export default function ScheduleCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>(scheduleRes);

  return (
    <div className="border-line h-200 w-343 rounded-2xl border p-20 sm:h-176 sm:w-636 md:h-176 md:w-728">
      <div className="mb-20 flex items-center justify-between">
        <h3 className="text-body-sb-20 text-text-01">7월 9일 일정표</h3>
        <Button
          className="pl-20.5pr-20.5"
          variant="default"
          size="scheduleDashboard"
          text="todoCard"
          onClick={() => setIsModalOpen(true)}
          disabled={false}
          icon={<ScheduleIcon className="h-20 w-20 text-white" />}
        >
          <span className="block sm:hidden">일정관리</span>
          <span className="hidden sm:block">일정 관리하기</span>
        </Button>
      </div>

      <div className="mb-20 h-80 overflow-y-scroll pr-4">
        <ul className="space-y-4">
          {assignedTasks.map(({ time, task }, idx) => (
            <li key={idx} className="flex items-start gap-12 text-sm">
              <span className="text-text-04 text-body-m-16">{time}</span>
              <span className="text-text-02 text-body-m-16">{task.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        assignedTasks={assignedTasks}
        setAssignedTasks={setAssignedTasks}
      />
    </div>
  );
}
