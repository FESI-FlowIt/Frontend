'use client';

import TimerIcon from '@/assets/icons/timer.svg';
import { IconButton } from '@/components/ui/IconButton';

export default function SelectTodoModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center px-16 pt-24 pb-16 md:px-40 md:pt-40 md:pb-40">
      <div className="flex items-center gap-12">
        <TimerIcon className="text-gray-01" width={24} height={24} fill="currentColor" />

        <h2 className="text-text-01 text-body-sb-20 md:text-display-24 leading-snug md:whitespace-nowrap">
          어떤 작업을 <br className="md:hidden" />
          시작해볼까요?
        </h2>
      </div>

      <div className="ml-auto pl-12 md:pl-0">
        <IconButton variant="close" aria-label="닫기" onClick={onClose} />
      </div>
    </div>
  );
}
