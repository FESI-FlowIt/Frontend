import Todo from '@/assets/icons/todo.svg';
import { useNotesByTodoId } from '@/hooks/useNotes';
import { NoteSummary } from '@/interfaces/note';
import { TodoWithNotes } from '@/interfaces/todo';

import { IconButton } from '../IconButton';

interface NoteListSidebarProps {
  todo: TodoWithNotes;
  onClose: () => void;
  onNoteClick: (noteId: number) => void;
}

const NoteListSidebar = ({ todo, onClose, onNoteClick }: NoteListSidebarProps) => {
  const { data: notes = [] } = useNotesByTodoId(todo.todoId);
  return (
    <div className="h-full bg-white px-20 py-40">
      {/* 헤더 */}
      <div className="mb-24 flex items-center justify-between">
        <h1 className="text-body-sb-20 text-text-01">노트 목록</h1>
        <IconButton variant="close" onClick={onClose} aria-label="사이드바 닫기" />
      </div>

      {/* 할 일 정보 */}
      <div className="mb-36 flex-row">
        <div className="mb-8 flex items-center gap-8">
          <div className="h-20 w-20">
            <Todo className="text-gray-01 h-full w-full" />
          </div>
          <div className="text-body-b-16 text-text-02">To do</div>
        </div>
        <div className="text-body-m-20 text-text-02 font-medium">{todo.name}</div>
      </div>
      <hr className="bg-line mb-36 h-2 border-none" />
      {/* 노트 리스트 */}
      <div>
        <div className="space-y-36">
          {notes?.map((note: NoteSummary) => (
            <button
              key={note.noteId}
              onClick={() => onNoteClick(note.noteId)}
              className="w-full text-left"
            >
              <div className="text-body-sb-20 text-text-01 mb-12">{note.title}</div>
              <div className="text-body-m-12 text-text-03">
                {new Date(note.updatedAt).toLocaleDateString()}
                {new Date(note.updatedAt).toLocaleTimeString()} 저장
              </div>
            </button>
          )) || <div className="text-text-04 py-20 text-center">작성된 노트가 없습니다</div>}
        </div>
      </div>
    </div>
  );
};

export default NoteListSidebar;
