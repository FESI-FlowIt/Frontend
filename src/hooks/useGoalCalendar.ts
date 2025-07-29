import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getCalendarData } from '@/api/calendarApi';
import { CalendarData, CalendarResponse } from '@/interfaces/calendar';
import { getCalendarInfo, groupGoalsByDate } from '@/lib/calendar';
import { useUserStore } from '@/store/userStore';

export const CALENDAR_QUERY_KEY = ['calendar'];
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

export const useDeadlineCalendar = (date: string) => {
  const user = useUserStore(state => state.user);

  return useQuery<CalendarResponse>({
    queryKey: [CALENDAR_QUERY_KEY, user?.id, date],
    queryFn: () => getCalendarData(user!.id, date),
    enabled: !!user?.id,
  });
};
