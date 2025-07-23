'use client';
import TimerIcon from '@/../public/assets/icons/timerIcon.svg';
import { formatNumber } from '@/lib/format';

type TimerButtonProps = {
  isRunning: boolean;
  minutes: number;
  seconds: number;
  onClick: () => void;
};

export default function TimerButton({ isRunning, minutes, seconds, onClick }: TimerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed right-40 bottom-40 z-50 flex h-100 w-100 cursor-pointer flex-col items-center justify-start rounded-full text-white shadow-xl transition-colors ${
        isRunning ? 'bg-primary-01' : 'bg-timer'
      }`}
    >
      <div className={`flex flex-col items-center ${isRunning ? 'mt-13' : 'mt-25'}`}>
        <TimerIcon className="h-24 w-24" />
        {isRunning ? (
          <>
            <div className="text-body-sb-20 mt-4">
              {`${formatNumber(minutes)}:${formatNumber(seconds)}`}
            </div>
            <div className="text-body-sb-16">할 일 중</div>
          </>
        ) : (
          <div className="text-body-sb-20 mt-4">할 일 시작</div>
        )}
      </div>
    </button>
  );
}
