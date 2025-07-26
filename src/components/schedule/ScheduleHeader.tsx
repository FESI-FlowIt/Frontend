import ScheduleIcon from '@/../public/assets/icons/scheduleIcon.svg';
import { IconButton } from '@/components/ui/IconButton';

interface ScheduleHeaderProps {
  onClose: () => void;
}

export default function ScheduleHeader({ onClose }: ScheduleHeaderProps) {
  return (
    <div className="border-line flex h-110 items-center justify-between border-b px-40 py-40">
      <div className="flex items-center gap-12">
        <ScheduleIcon className="h-20 w-20" />
        <h2 className="text-display-24 text-text-01">일정 관리</h2>
      </div>
      <IconButton variant="close" aria-label="닫기" onClick={onClose} />
    </div>
  );
}
