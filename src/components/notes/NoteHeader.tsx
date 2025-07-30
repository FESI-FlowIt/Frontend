import React from 'react';

import { Button } from '@/components/ui/Button';

const NoteHeader = () => (
  <div className="flex w-full items-center justify-between">
    <h1 className="text-text-01 text-display-32 font-bold">노트 작성</h1>
    <div className="flex gap-8">
      <Button
        type="button"
        variant="transparent"
        text="noteHeader"
        size="authModal"
        disabled={false}
      >
        임시저장
      </Button>
      <Button
        type="button"
        variant="noteHeader"
        text="noteHeaderWhite"
        size="authModal"
        disabled={false}
      >
        작성 완료
      </Button>
    </div>
  </div>
);

export default NoteHeader;
