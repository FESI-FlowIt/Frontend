'use client';
import TimerIcon from '@/assets/icons/timer.svg';
import { formatNumber } from '@/lib/format';

interface TimerButtonProps {
  isRunning: boolean;
  minutes: number;
  seconds: number;
  onClick: () => void;
}

export default function TimerButton({ isRunning, minutes, seconds, onClick }: TimerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed right-40 bottom-40 z-50 flex h-60 w-60 flex-col items-center justify-center rounded-full text-white shadow-xl transition-colors lg:h-100 lg:w-100 ${isRunning ? 'bg-primary-01 border-timer border-2 lg:border-4' : 'bg-timer'}`}
    >
      <TimerIcon
        className="mb-4 h-[14px] w-[14px] text-white lg:h-[24px] lg:w-[24px]"
        fill="currentColor"
      />

      {isRunning ? (
        <>
          <div className="text-body-12 lg:text-body-sb-20 leading-4">
            {`${formatNumber(minutes)}:${formatNumber(seconds)}`}
          </div>
          <div className="text-body-10 lg:text-body-m-16">할 일 중</div>
        </>
      ) : (
        <div className="text-body-12 lg:text-body-sb-20 mt-4">할 일 시작</div>
      )}
    </button>
  );
}
