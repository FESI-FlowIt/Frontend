import { ApiCalendarResponse, CalendarResponse, Goal } from '@/interfaces/calendar';

export const mapApiResponseToCalendar = (apiResponse: ApiCalendarResponse): CalendarResponse => {
  const mappedGoals: Goal[] = apiResponse.result.goals.map(apiGoal => ({
    id: apiGoal.id,
    title: apiGoal.name,
    due_date: apiGoal.dueDateTime,
    color: apiGoal.color,
    created_at: apiGoal.createdDateTime,
  }));

  return {
    success: true,
    data: {
      month: apiResponse.result.date,
      goals: mappedGoals,
    },
  };
};
