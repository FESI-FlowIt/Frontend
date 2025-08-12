'use client';

import CalendarSection from '@/components/calendar/CalendarSection';
import GoalListDashboardSection from '@/components/goals/GoalListDashboardSection';
import HeatmapSection from '@/components/heatmaps/HeatmapSection';
import ScheduleSection from '@/components/schedule/ScheduleSection';
import TimerWidget from '@/components/timer/TimerWidget';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  return (
    <div className={cn('sm:mt-54 sm:ml-0 md:mt-0 md:ml-88 lg:mt-0 lg:ml-0')}>
      {/* 모바일/태블릿: 세로 스택 */}
      <div className="space-y-24 lg:hidden">
        <HeatmapSection />
        <CalendarSection />
        <ScheduleSection />
        <GoalListDashboardSection />
      </div>

      {/* PC: 복합 레이아웃 */}
      <div className="mx-auto hidden max-w-1920 lg:flex lg:h-full lg:flex-col lg:gap-24">
        <div className="flex flex-1 gap-24">
          <HeatmapSection />
          <div className="flex flex-col gap-12">
            <CalendarSection />
            <ScheduleSection />
          </div>
        </div>

        <GoalListDashboardSection />
      </div>

      <TimerWidget />
    </div>
  );
}
