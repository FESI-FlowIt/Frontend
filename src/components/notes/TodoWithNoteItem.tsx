import Todo from '@/assets/icons/todo.svg';
import { TodoWithNotes } from '@/interfaces/todo';

interface TodoWithNoteItemProps {
  todo: TodoWithNotes;
}

const TodoWithNoteItem = ({ todo }: TodoWithNoteItemProps) => {
  return (
    <div className="border-line rounded-12 h-full w-full border-1 bg-white p-12 sm:p-20">
      <div className="flex items-center justify-between">
        <div className="max-w-221 flex-row items-center sm:max-w-none">
          <div className="mb-8 flex gap-8">
            <div className="flex h-20 w-20 items-center justify-center">
              <Todo className="text-gray-01 h-full w-full" />
            </div>
            <div className="text-text-02 text-body-b-16">{todo.isDone ? 'Done' : 'To do'}</div>
          </div>
          <div className="text-body-m-16 sm:text-body-m-20 text-text-02">{todo.title}</div>
        </div>
        <div className="text-primary-01 text-body-b-16 bg-heatmap-1 rounded-[5px] p-8 font-medium">
          노트 3개
        </div>
      </div>
    </div>
  );
};

export default TodoWithNoteItem;
