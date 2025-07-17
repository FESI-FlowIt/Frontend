export interface Note {
  noteId: string;
  todoId: string; // 소속 할 일의 ID
  title: string; // 최대 30자
  content: string; // 최대
  link?: string; // 선택적
  createdAt: string;
  updatedAt: string;
}
