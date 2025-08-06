'use client';

import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { scheduleMapper } from '@/api/mapper/scheduleMapper';
import { schedulesApi } from '@/api/scheduleApi';
import ScheduleIcon from '@/assets/icons/schedule.svg';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import type { AssignedTask } from '@/interfaces/schedule';
import { getTodayScheduleTitle } from '@/lib/calendarUtils';
import { useUserStore } from '@/store/userStore';

import ScheduleModal from './ScheduleModal';

export default function ScheduleSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);

  const user = useUserStore(state => state.user);
  const todayDateStr = dayjs().format('YYYY-MM-DD');

  // 특정 날짜의 할 일 다시 불러오기
  const fetchAssignedTasksByDate = async (date: string) => {
    try {
      const res = await schedulesApi.getAssignedTodos(date);
      const mapped = scheduleMapper.mapAssignedTodosToAssignedTasks(res.assignedTodos);
      setAssignedTasks(prev => [...prev.filter(task => task.date !== date), ...mapped]);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(' 일정 불러오기 실패:', err);
      }
    }
  };

  const fetchTodayAssignedTasks = async () => {
    await fetchAssignedTasksByDate(todayDateStr);
  };

  useEffect(() => {
    if (user) fetchTodayAssignedTasks();
  }, [user]);

  const todayAssigned = assignedTasks.filter(task => task.date === todayDateStr);

  // 중복 제거 및 정렬
  const deduplicatedAssignedTasks = Array.from(
    new Map(todayAssigned.map(item => [`${item.task.id}-${item.time}`, item])).values(),
  ).sort((a, b) => a.time.localeCompare(b.time));

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
      <div className="mb-20 h-80 overflow-y-scroll pr-4">
        <ul className="space-y-4">
          {deduplicatedAssignedTasks.map(({ time, task }) => (
            <li key={`${task.id}-${time}`} className="flex items-start gap-12 text-sm">
              <span className="text-text-04 text-body-m-16">{time}</span>
              <span className="text-text-02 text-body-m-16">{task.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {user && (
        <ScheduleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          assignedTasks={assignedTasks}
          setAssignedTasks={setAssignedTasks}
          selectedDate={todayDateStr}
          onSaved={(_updated, changedDates) => {
            changedDates.forEach(date => fetchAssignedTasksByDate(date));
          }}
        />
      )}
    </Card>
  );
}
