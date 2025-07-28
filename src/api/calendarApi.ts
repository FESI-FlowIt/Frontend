import { getRequest } from '@/api';
import { CalendarResponse } from '@/interfaces/calendar';

export const getCalendarData = async (userId: number, date: string): Promise<CalendarResponse> => {
  return getRequest('/goals/todos/due-monthly', {
    userId,
    date,
  });
};
