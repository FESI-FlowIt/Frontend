export interface Task {
  id: string;
  title: string;
  color: string;
}

export interface AssignedTask {
  schedId?: number;
  task: Task;
  time: string;
}
// src/interfaces/schedule.ts 맨 아래 또는 적절한 위치에 추가
export interface ScheduleInfoRequest {
  schedId?: number;
  todoId: number;
  startedDateTime: string;
  endedDateTime: string;
  isRemoved: boolean;
}

export interface SaveScheduleRequest {
  userId: number;
  scheduleInfos: ScheduleInfoRequest[];
}
export interface AssignedTodoApi {
  schedId: number;
  todoId: number;
  name: string;
  color: string;
  startedDateTime: string;
  endedDateTime: string;
}

export interface GetAssignedTodosResponse {
  date: string;
  assignedTodos: AssignedTodoApi[];
}
export interface UnassignedTodoApi {
  todoId: number;
  name: string;
  color: string;
  dueDateTime: string;
}
export interface AssignedTodoApi {
  schedId: number;
  todoId: number;
  name: string;
  color: string;
  startedDateTime: string;
  endedDateTime: string;
}
