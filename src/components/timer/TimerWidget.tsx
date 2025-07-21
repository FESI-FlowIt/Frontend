'use client';

import { useState, useEffect } from 'react';
import ClockIcon from '@/assets/icons/clock.svg';

export default function TimerWidget() {
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev === 59) {
          setMinutes(min => min + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleClick = () => {
    if (!isRunning) {
      setMinutes(0);
      setSeconds(0);
    }
    setIsRunning(prev => !prev);
  };

  const format = (num: number) => String(num).padStart(2, '0');

  return (
    <button
      onClick={handleClick}
      className={`fixed right-40 bottom-40 z-50 flex h-100 w-100 flex-col items-center justify-start rounded-full text-white shadow-xl transition-colors ${isRunning ? 'bg-primary-01' : 'bg-timer'}`}
    >
      <div className={`flex flex-col items-center ${isRunning ? 'mt-13' : 'mt-25'}`}>
        <ClockIcon className="h-24 w-24" />

        {isRunning ? (
          <>
            <div className="text-body-sb-20 mt-4">{`${format(minutes)}:${format(seconds)}`}</div>
            <div className="text-body-sb-16">할 일 중</div>
          </>
        ) : (
          <div className="text-body-sb-20 mt-4">할 일 시작</div>
        )}
      </div>
    </button>
  );
}
