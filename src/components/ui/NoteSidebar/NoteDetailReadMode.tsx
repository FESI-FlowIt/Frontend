import PencilIcon from '@/assets/icons/pencil.svg';
import NoteContentEditor from '@/components/notes/NoteContentEditor';
import NoteInfo from '@/components/notes/NoteInfo';
import { Button } from '@/components/ui/Button';
import { Note } from '@/interfaces/note';

interface NoteDetailReadModeProps {
  note: Note;
  onEdit: () => void;
  goalTitle?: string;
  todoTitle?: string;
}

const NoteDetailReadMode = ({ note, onEdit, goalTitle, todoTitle }: NoteDetailReadModeProps) => {
  return (
    <div className="relative h-full w-full">
      <div className="px-20">
        <NoteInfo
          mode="readonly"
          hasTemp={false}
          goalTitle={goalTitle}
          todoTitle={todoTitle}
          noteTitle={note.title}
          noteLink={note.link}
        />
      </div>

      <div className="my-24 px-20">
        <NoteContentEditor mode="readonly" readOnlyContent={note.content} />
      </div>

      <div className="absolute right-16 bottom-24 z-20">
        <Button
          type="button"
          variant="noteHeader"
          text="sideNote"
          size="sideNote"
          onClick={onEdit}
          disabled={false}
          className="bg-primary-01 text-white"
          icon={<PencilIcon className="mr-2" />}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
};

export default NoteDetailReadMode;
