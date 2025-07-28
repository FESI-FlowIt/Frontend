export interface Note {
  noteId: number;
  todoId: number;
  title: string;
  content: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
}
