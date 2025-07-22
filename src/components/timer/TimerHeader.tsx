import TimerIcon from '@/../public/assets/icons/timerIcon.svg';
import { IconButton } from '@/components/ui/IconButton';

type Props = {
  onBack: () => void;
  onClose: () => void;
};

export default function TimerHeader({ onBack, onClose }: Props) {
  return (
    <div className="mb-40 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <IconButton variant="back" aria-label="뒤로가기" onClick={onBack} />
        <TimerIcon className="text-Gray_01 h-24 w-24" />
        <h2 className="text-display-24">할 일 타이머</h2>
      </div>
      <IconButton variant="close" aria-label="닫기" onClick={onClose} />
    </div>
  );
}
