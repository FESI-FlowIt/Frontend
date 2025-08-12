import Todo from '@/assets/icons/todo.svg';
import { TodoWithNotes } from '@/interfaces/todo';

interface TodoWithNoteItemProps {
  todo: TodoWithNotes;
  onTodoClick: (todo: TodoWithNotes) => void;
}

const TodoWithNoteItem = ({ todo, onTodoClick }: TodoWithNoteItemProps) => {
  const handleClick = () => {
    onTodoClick(todo);
  };

  return (
    <div
      className="border-line rounded-12 h-full w-full cursor-pointer border-1 bg-white p-12 transition-shadow hover:shadow-md sm:p-20"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="max-w-221 flex-row items-center sm:max-w-none">
          <div className="mb-8 flex gap-8">
            <div className="flex h-20 w-20 items-center justify-center">
              <Todo className="text-gray-01 h-full w-full" />
            </div>
            <div className="text-text-02 text-body-b-16">{todo.isDone ? 'Done' : 'To do'}</div>
          </div>
          <div className="text-body-m-16 sm:text-body-m-20 text-text-02">{todo.name}</div>
        </div>
        <div className="text-primary-01 text-body-b-16 bg-heatmap-1 rounded-[5px] p-8 font-medium">
          노트 {todo.note.length}개
        </div>
      </div>
    </div>
  );
};

export default TodoWithNoteItem;
