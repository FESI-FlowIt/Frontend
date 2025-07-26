import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { CalendarData, CalendarResponse } from '@/interfaces/calendar';
import { getCalendarInfo, groupGoalsByDate } from '@/lib/calendar';

// 캘린더 렌더링에 필요한 데이터를 계산
export const useCalendarData = (data: CalendarData) => {
  return useMemo(() => {
    const { month, goals } = data;

    const { currentMonth, firstDay, daysInMonth } = getCalendarInfo(month);
    const groupedGoals = groupGoalsByDate(goals);

    return {
      currentMonth,
      firstDay,
      daysInMonth,
      groupedGoals,
    };
  }, [data]);
};

export const useDeadlineCalendar = (month: string) => {
  return useQuery<CalendarResponse>({
    queryKey: ['calendar', month],
    queryFn: async () => {
      const res = await fetch(`/calendar?month=${month}`);
      return res.json();
    },
  });
};
