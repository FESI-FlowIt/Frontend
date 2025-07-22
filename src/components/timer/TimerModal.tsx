'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import TimerHeader from './TimerHeader';
import TaskInfo from './TaskInfo';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TotalTimeDisplay from './TotalTimerDisplay';

export type TimerModalProps = {
  onClose: () => void;
  onBack: () => void;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  isRunning: boolean;
  goalTitle: string;
  goalColor: string;
  todoContent: string;
  todoId: string;
};

export default function TimerModal({
  onClose,
  onBack,
  onStart,
  onPause,
  onStop,
  isRunning,
  goalTitle,
  goalColor,
  todoContent,
  todoId,
}: TimerModalProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(elapsedSeconds);
  const {
    hours: totalH,
    minutes: totalM,
    seconds: totalS,
  } = formatTime(totalElapsed + elapsedSeconds);

  const handleStop = async () => {
    const total = totalElapsed + elapsedSeconds;
    setElapsedSeconds(0);
    setTotalElapsed(total);

    try {
      await fetch('/api/timer/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todoId,
          elapsedSeconds: total,
          endedAt: new Date().toISOString(),
        }),
      });
      console.log('저장 완료!');
    } catch (err) {
      console.error('서버 저장 실패', err);
    }

    onStop(); // 부모에게 중지 알림
  };

  return (
    <Modal isOpen onClose={onClose} size="timer">
      <div className="w-520 p-10">
        <TimerHeader onBack={onBack} onClose={onClose} />
        <TaskInfo goalTitle={goalTitle} goalColor={goalColor} todoContent={todoContent} />
        <TimerDisplay hours={hours} minutes={minutes} seconds={seconds} />
        <TimerControls
          isRunning={isRunning}
          onStart={onStart}
          onPause={onPause}
          onStop={handleStop}
        />
        <TotalTimeDisplay totalH={totalH} totalM={totalM} totalS={totalS} />
      </div>
    </Modal>
  );
}
