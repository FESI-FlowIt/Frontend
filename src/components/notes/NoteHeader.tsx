import React from 'react';

import { Button } from '@/components/ui/Button';

interface NoteHeaderProps {
  onDraft: () => void;
  onComplete: () => void;
  isCompleteEnabled?: boolean;
}

const NoteHeader = ({ onDraft, onComplete, isCompleteEnabled }: NoteHeaderProps) => (
  <div className="flex w-full items-center justify-between">
    <h1 className="text-text-01 md:text-display-32 sm:text-display-24 font-bold">노트 작성</h1>
    <div className="flex gap-8">
      <Button
        type="button"
        variant="transparent"
        text="noteHeader"
        size="noteHeader"
        disabled={false}
        onClick={onDraft}
      >
        임시저장
      </Button>
      <Button
        type="button"
        variant="noteHeader"
        text="noteHeaderWhite"
        size="noteHeader"
        disabled={!isCompleteEnabled}
        onClick={onComplete}
        className={isCompleteEnabled ? 'bg-primary-01 text-white' : ''}
      >
        작성 완료
      </Button>
    </div>
  </div>
);

export default NoteHeader;
