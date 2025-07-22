import { IconButton } from '@/components/ui/IconButton';
import Modal from '@/components/ui/Modal';
import TimerIcon from '@/../public/assets/icons/timerIcon.svg';

type TimerModalProps = {
  onClose: () => void;
  onBack: () => void;
  goalTitle: string;
  goalColor: string;
  todoContent: string;
};

export default function TimerModal({
  onClose,
  onBack,
  goalTitle,
  goalColor,
  todoContent,
}: TimerModalProps) {
  return (
    <Modal isOpen onClose={onClose} size="timer">
      <div className="w-520 p-10">
        {/* 헤더 */}
        <div className="mb-40 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <TimerIcon className="text-Gray_01 h-24 w-24" />
            <h2 className="text-display-24">할 일 타이머</h2>
          </div>
          <div className="flex items-center gap-2">
            <IconButton variant="close" aria-label="닫기" onClick={onClose} />
          </div>
        </div>

        {/* 작업 정보 */}
        <div className="bg-tertiary-01 rounded-12 mb-80 px-16 pt-20 pb-16">
          <div className="text-body-sb-20 mb-20 flex items-center gap-12">
            <span className={`h-12 w-12 rounded-full bg-goal-${goalColor}`} />
            {goalTitle}
          </div>
          <p className="text-body-long-16 text-text-02">{todoContent}</p>
        </div>

        {/* 타이머 숫자 */}
        <div className="mb-60 flex items-end justify-center gap-8 text-center">
          <span className="text-[80px] leading-[82px] font-bold">00</span>
          <span className="text-display-32 leading-[82px]">:</span>
          <span className="text-[80px] leading-[82px] font-bold">00</span>
          <span className="text-display-32 leading-[82px]">:</span>
          <span className="text-[80px] leading-[82px] font-bold">00</span>
        </div>

        {/* 제어 버튼 영역 */}
        <div className="mt-60 mb-80 flex justify-center gap-32">
          {/* 일시정지 버튼 */}
          <button
            aria-label="일시정지"
            className="border-line bg-tertiary-01 flex h-88 w-88 items-center justify-center rounded-full border"
            onClick={() => console.log('pause')}
          >
            <div className="flex gap-7">
              <div className="bg-primary-01 h-43 w-11 rounded-sm" />
              <div className="bg-primary-01 h-43 w-11 rounded-sm" />
            </div>
          </button>

          {/* 정지 버튼 */}
          <button
            aria-label="중지"
            className="border-line bg-tertiary-01 flex h-88 w-88 items-center justify-center rounded-full border"
            onClick={() => console.log('stop')}
          >
            <div className="bg-error h-41 w-41 rounded-[4px]" />
          </button>
        </div>

        {/* 누적 시간 */}
        <div className="bg-line mb-16 h-px w-full" />
        <div className="text-center">
          <div className="text-text-02 text-display-24 mb-16 leading-30">총 124:00:23</div>
          <div className="text-text-03 text-body-m-20">누적 작업 시간</div>
        </div>
      </div>
    </Modal>
  );
}
