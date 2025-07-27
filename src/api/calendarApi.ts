import { getRequest } from '@/api';
import { CalendarResponse } from '@/interfaces/calendar';

export const getCalendarData = async (month: string): Promise<CalendarResponse> => {
  return getRequest('/calendar', { month });
};
