'use client';

import { useState } from 'react';

import ScheduleIcon from '@/assets/icons/schedule.svg';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import type { AssignedTask } from '@/interfaces/schedule';
import { getTodayScheduleTitle } from '@/lib/calendarUtils';
import { scheduleRes } from '@/mocks/mockResponses/schedule/scheduleResponse';

import ScheduleModal from './ScheduleModal';

export default function ScheduleSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>(scheduleRes);

  return (
    <Card
      size="schedule"
      title={getTodayScheduleTitle()}
      icon={<ScheduleIcon className="text-icon-01" width={20} height={20} />}
      extra={
        <Button
          variant="default"
          text="todoCard"
          size="scheduleDashboard"
          onClick={() => setIsModalOpen(true)}
          icon={<ScheduleIcon className="text-white" width={20} height={20} fill="currentColor" />}
          disabled={false}
          className="flex items-center gap-4"
        >
          <span className="block sm:hidden">일정관리</span>
          <span className="hidden sm:block">일정 관리하기</span>
        </Button>
      }
    >
      {/* Content */}
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
    </Card>
  );
}
