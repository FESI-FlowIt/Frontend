'use client';

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
  minutes: number;
  seconds: number;
  accumulatedSeconds: number;
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
  minutes,
  seconds,
  accumulatedSeconds,
}: TimerModalProps) {
  const formatTime = (totalSeconds: number) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return { hours, minutes: mins, seconds: secs };
  };

  const currentSeconds = minutes * 60 + seconds;
  const totalElapsedSeconds = accumulatedSeconds + currentSeconds;

  const { hours, minutes: mm, seconds: ss } = formatTime(currentSeconds);
  const { hours: totalH, minutes: totalM, seconds: totalS } = formatTime(totalElapsedSeconds);

  return (
    <Modal isOpen onClose={onClose} size="timer">
      <div className="w-520 p-10">
        <TimerHeader onBack={onBack} onClose={onClose} />
        <TaskInfo goalTitle={goalTitle} goalColor={goalColor} todoContent={todoContent} />
        <TimerDisplay hours={hours} minutes={mm} seconds={ss} />
        <TimerControls isRunning={isRunning} onStart={onStart} onPause={onPause} onStop={onStop} />
        <TotalTimeDisplay totalH={totalH} totalM={totalM} totalS={totalS} />
      </div>
    </Modal>
  );
}
