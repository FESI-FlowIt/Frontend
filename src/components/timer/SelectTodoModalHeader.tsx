'use client';

import TimerIcon from '@/assets/icons/timer.svg';
import { IconButton } from '@/components/ui/IconButton';

export default function SelectTodoModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="mb-40 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <TimerIcon className="text-gray-01" width={24} height={24} fill="currentColor" />
        <h2 className="text-display-24 text-text-01">어떤 작업을 시작해볼까요?</h2>
      </div>
      <IconButton variant="close" aria-label="닫기" onClick={onClose} />
    </div>
  );
}
