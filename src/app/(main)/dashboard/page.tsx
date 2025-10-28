'use client';

import CalendarSection from '@/components/calendar/CalendarSection';
import GoalListDashboardSection from '@/components/goals/GoalListDashboardSection';
import HeatmapSection from '@/components/heatmaps/HeatmapSection';
import ScheduleSection from '@/components/schedule/ScheduleSection';
import TimerWidget from '@/components/timer/TimerWidget';

export default function DashboardPage() {
  return (
    <div className="mt-54 md:mt-0">
      <div className="mx-auto w-full md:pl-80 lg:px-30">
        {/* 모바일/태블릿: 세로 스택 */}
        <div className="space-y-24 lg:hidden">
          <HeatmapSection />
          <CalendarSection />
          <ScheduleSection />
          <GoalListDashboardSection />
        </div>

        {/* PC: 복합 레이아웃 */}
        <div className="hidden lg:flex lg:h-full lg:flex-col lg:gap-24 lg:pl-80">
          <div className="flex flex-1 gap-24">
            <div className="flex-1">
              <HeatmapSection />
            </div>

            <div className="flex flex-1 flex-col gap-12">
              <CalendarSection />
              <ScheduleSection />
            </div>
          </div>

          <GoalListDashboardSection />
        </div>
      </div>

      <TimerWidget />
    </div>
  );
}
