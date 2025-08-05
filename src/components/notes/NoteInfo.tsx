import React, { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import GoalIcon from '@/assets/icons/goal.svg';
import IconDelete from '@/assets/icons/ic-delete.svg';
import TodoIcon from '@/assets/icons/todo.svg';
import Dialog from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { useTempNote } from '@/hooks/useTempNote';
import { useNoteWriteStore } from '@/store/noteWriteStore';

import { Button } from '../ui/Button';

import LinkCard from './LinkCard';

const MAX_LENGTH = 30;
interface NoteInfoProps {
  hasTemp: boolean;
}

const NoteInfo = ({ hasTemp }: NoteInfoProps) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const searchParams = useSearchParams();

  const title = useNoteWriteStore(state => state.title);
  const setTitle = useNoteWriteStore(state => state.setTitle);
  const todoId = useNoteWriteStore(state => state.todoId);
  const link = useNoteWriteStore(state => state.link);
  const setLink = useNoteWriteStore(state => state.setLink);

  // URL에서 todo 정보 가져오기
  const todoTitle = searchParams.get('todoTitle') || '';
  const goalTitle = searchParams.get('goalTitle') || '';

  const { loadTempToForm } = useTempNote(todoId);

  const handleLoadTemp = () => {
    setShowLoadDialog(true);
  };

  const handleConfirmLoad = () => {
    loadTempToForm();
    setHasLoaded(true);
    setShowLoadDialog(false);
  };

  const handleCancelLoad = () => {
    setShowLoadDialog(false);
  };

  return (
    <div className="">
      {/* 목표 정보 */}
      <div className="mb-16 flex items-center gap-8">
        <div className="h-24 w-24">
          <GoalIcon className="text-goal-red" />
        </div>
        <div className="text-body-b-16 bold text-text-01">{goalTitle}</div>
      </div>
      {/* 할 일 정보 */}
      <div className="mb-24 flex items-center gap-8">
        <div className="flex h-20 w-20 items-center justify-center">
          <TodoIcon className="text-gray-01" />
        </div>
        <div className="text-body-b-16 text-text-02 font-bold">To do</div>
        <span className="text-body-m-16 text-text-01 font-medium">{todoTitle}</span>
      </div>
      {/* 임시저장 알림 */}
      {hasTemp && !hasLoaded && (
        <div className="bg-secondary-01-hover rounded-12 my-24 flex h-56 items-center">
          <div className="flex w-full justify-between gap-16">
            <div className="flex items-center gap-12 pl-16">
              <IconDelete className="delete-icon" width={24} height={24} />
              <h4 className="text-primary-01 text-body-m-16 font-medium">
                임시저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?
              </h4>
            </div>
            <Button
              onClick={handleLoadTemp}
              disabled={false}
              size="tempNote"
              text="tempNote"
              className="my-8 mr-12"
            >
              불러오기
            </Button>
          </div>
        </div>
      )}
      <div className="relative">
        <Input
          variant="noteTitle"
          inputSize="noteTitle"
          text="noteTitle"
          type="text"
          maxLength={MAX_LENGTH}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="노트의 제목을 입력해주세요"
        />
        <div className="absolute top-16 right-0 flex items-center gap-1 text-xs font-medium">
          <span className="text-text-01">{title.length}/</span>
          <span className="text-primary-01">{MAX_LENGTH}</span>
        </div>
      </div>

      {/* 링크 카드 표시 */}
      {link && (
        <div className="mt-16">
          <LinkCard url={link} onRemove={() => setLink(null)} />
        </div>
      )}

      {/* 임시저장 노트 불러오기 확인 다이얼로그 */}
      <Dialog isOpen={showLoadDialog} padding="note" onClose={handleCancelLoad}>
        <div className="flex h-full w-full flex-col items-center justify-center text-center">
          <h2 className="text-body-sb-20 text-text-01 mb-16">노트를 불러오시겠어요?</h2>
          <p className="text-body-m-16 text-text-01 mb-32">&apos;{todoTitle}&apos;</p>
          <div className="flex w-full max-w-248 gap-12">
            <Button
              onClick={handleCancelLoad}
              variant="primary"
              size="modal"
              text="primary"
              disabled={false}
            >
              취소
            </Button>
            <Button
              onClick={handleConfirmLoad}
              variant="default"
              size="modal"
              text="noteHeaderWhite"
              disabled={false}
            >
              불러오기
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default NoteInfo;
