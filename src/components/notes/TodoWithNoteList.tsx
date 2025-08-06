import { TodoWithNotes } from '@/interfaces/todo';

import TodoWithNoteItem from './TodoWithNoteItem';

interface NoteListProps {
  todos: TodoWithNotes[];
}

const NoteList = ({ todos }: NoteListProps) => {
  return (
    <div className="flex flex-col gap-12">
      {todos.map(todo => (
        <TodoWithNoteItem key={todo.todoId} todo={todo} />
      ))}
    </div>
  );
};

export default NoteList;
