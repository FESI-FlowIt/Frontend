import { getRequest } from '@/api';
import { calendarMapper } from '@/api/mapper/calendarMapper';
import { ApiCalendarResponse, CalendarResponse } from '@/interfaces/calendar';

export const getCalendarData = async (userId: number, date: string): Promise<CalendarResponse> => {
  const apiResponse: ApiCalendarResponse = await getRequest('/goals/todos/due-monthly//', {
    userId,
    date,
  });
  return calendarMapper.mapApiToCalendar(apiResponse);
};
