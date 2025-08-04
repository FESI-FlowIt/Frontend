// 개별 할 일(Task)의 기본 정보
export interface Task {
  id: string;       
  title: string;     
  color: string;     
}

// 배치된 할 일(시간표에 배정된 할 일)의 정보
export interface AssignedTask {
  schedId?: number;  
  task: Task;        
  time: string;      
}

// 서버로 일정 저장 시 요청에 사용되는 개별 스케줄 정보
export interface ScheduleInfoRequest {
  schedId?: number;       
  todoId: number;         
  startedDateTime: string;
  endedDateTime: string;  
  isRemoved: boolean;     
}

// 서버로 보낼 일정 저장 전체 요청
export interface SaveScheduleRequest {
  userId: number;                      
  scheduleInfos: ScheduleInfoRequest[]; 
}

// 서버에서 받은 배정된 할 일 하나의 API 응답 형태
export interface AssignedTodoApi {
  schedId: number;          
  todoId: number;           
  name: string;             
  color: string;            
  startedDateTime: string;  
  endedDateTime: string;    
}

// 서버에서 받은 특정 날짜의 모든 배정된 할 일 목록 응답
export interface GetAssignedTodosResponse {
  date: string;                    
  assignedTodos: AssignedTodoApi[]; 
}

// 서버에서 받은 미배정 할 일의 API 응답 형태
export interface UnassignedTodoApi {
  todoId: number;           
  name: string;             
  color: string;           
  dueDateTime: string;      
}
