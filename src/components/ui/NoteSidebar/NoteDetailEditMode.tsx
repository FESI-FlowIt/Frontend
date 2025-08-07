import NoteContentEditor from '@/components/notes/NoteContentEditor';
import NoteInfo from '@/components/notes/NoteInfo';
import NoteToolbar from '@/components/notes/NoteToolbar';
import LinkModal from '@/components/todos/LinkModal';
import { Button } from '@/components/ui/Button';
import { Note } from '@/interfaces/note';
import { useNoteWriteStore } from '@/store/noteWriteStore';

interface NoteDetailEditModeProps {
  note?: Note;
  onClose?: () => void;
  onCancel: () => void;
  onSave: () => void;
  goalTitle?: string;
  todoTitle?: string;
}

const NoteDetailEditMode = ({
  onCancel,
  onSave,
  goalTitle,
  todoTitle,
}: NoteDetailEditModeProps) => {
  const { title, content, setLink } = useNoteWriteStore();

  const handleAddNoteLink = (url: string) => {
    setLink(url);
  };

  const isCompleteEnabled = Boolean(title?.trim() && content?.trim());

  return (
    <div className="relative h-full w-full">
      <div className="px-20">
        <NoteInfo mode="edit" hasTemp={false} goalTitle={goalTitle} todoTitle={todoTitle} />
      </div>

      <div className="my-24 px-20">
        <NoteContentEditor mode="edit" />
      </div>

      <div className="absolute bottom-80 z-10 w-full px-16">
        <NoteToolbar />
      </div>

      {/* 취소/저장 버튼을 오른쪽 아래에 배치 */}
      <div className="absolute right-16 bottom-24 z-20 flex gap-8">
        <Button
          type="button"
          variant="primary"
          text="noteHeader"
          size="sideNote"
          disabled={false}
          onClick={onCancel}
        >
          취소
        </Button>
        <Button
          type="button"
          variant="noteHeader"
          text="sideNote"
          size="sideNote"
          onClick={onSave}
          disabled={!isCompleteEnabled}
          className="bg-primary-01 text-white"
        >
          저장
        </Button>
      </div>

      {/* 링크 모달 */}
      <LinkModal onAddNoteLink={handleAddNoteLink} />
    </div>
  );
};

export default NoteDetailEditMode;
