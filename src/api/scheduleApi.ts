import { getRequest, postRequest } from '.';
import type {
  SaveScheduleRequest,
  GetAssignedTodosResponse,UnassignedTodoApi
} from '@/interfaces/schedule';

interface GetUnassignedTodosResponse {
  date: string;
  unassignedTodos: UnassignedTodoApi[];
}

export const schedulesApi = {
  getUnassignedTodos: async (
    date: string
  ): Promise<GetUnassignedTodosResponse> => {
    const res = await getRequest('/schedules/unassigned', { date });
    return res.result;
  },

  getAssignedTodos: async (
    date: string
  ): Promise<GetAssignedTodosResponse> => {
    const res = await getRequest('/schedules/assigned', { date });
    return res.result;
  },

  saveSchedules: async (data: SaveScheduleRequest): Promise<void> => {
    await postRequest('/schedules', data); 
  },
};

