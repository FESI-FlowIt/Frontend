'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import ScheduleIcon from '@/assets/icons/schedule.svg';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import type { AssignedTask } from '@/interfaces/schedule';
import { getTodayScheduleTitle } from '@/lib/calendarUtils';
import { schedulesApi } from '@/api/scheduleApi';
import { scheduleMapper } from '@/api/mapper/scheduleMapper';
import { useUserStore } from '@/store/userStore';
import ScheduleModal from './ScheduleModal';

export default function ScheduleSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);

  const user = useUserStore(state => state.user);
  const userId = user?.id ?? 0;

  const todayDateStr = dayjs().format('YYYY-MM-DD');

  const fetchAssignedTasks = async () => {
    try {
      const res = await schedulesApi.getAssignedTodos(userId, todayDateStr);
      const mapped = scheduleMapper.mapAssignedTodosToAssignedTasks(res.assignedTodos);
      setAssignedTasks(mapped);
    } catch (err) {
      console.error('배치 일정 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    if (user) fetchAssignedTasks();
  }, [user]);

  // 오늘 날짜만 필터링
  const todayAssigned = assignedTasks.filter(task => task.date === todayDateStr);

  // 중복 제거 + 시간순 정렬
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
          onClose={(saved?: boolean) => {
            setIsModalOpen(false);
            if (saved) fetchAssignedTasks();
          }}
          assignedTasks={assignedTasks}
          setAssignedTasks={setAssignedTasks}
          userId={userId}
          selectedDate={todayDateStr}
        />
      )}
    </Card>
  );
}
