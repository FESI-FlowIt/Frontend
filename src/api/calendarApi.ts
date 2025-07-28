import { getRequest } from '@/api';
import { ApiCalendarResponse, CalendarResponse } from '@/interfaces/calendar';
import { mapApiResponseToCalendar } from '@/lib/calendarMapper';

export const getCalendarData = async (userId: number, date: string): Promise<CalendarResponse> => {
  const apiResponse: ApiCalendarResponse = await getRequest('/goals/todos/due-monthly', {
    userId,
    date,
  });
  return mapApiResponseToCalendar(apiResponse);
};
