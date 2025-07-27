export interface Task {
  id: string;
  title: string;
  color: string;
}

export interface AssignedTask {
  task: Task;
  time: string;
}