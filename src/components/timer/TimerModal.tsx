'use client';

import Modal from '@/components/ui/Modal';
import TaskInfo from './TaskInfo';
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
import TimerHeader from './TimerHeader';
import TotalTimeDisplay from './TotalTimerDisplay';
import { formatTime, getCurrentSeconds, getTotalElapsedSeconds } from '@/lib/timerUtils';

export interface TimerModalProps {
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
}

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
  todoId: _todoId, // eslint-disable-line @typescript-eslint/no-unused-vars
  minutes,
  seconds,
  accumulatedSeconds,
}: TimerModalProps) {
  const currentSeconds = getCurrentSeconds(minutes, seconds);
  const totalElapsedSeconds = getTotalElapsedSeconds(currentSeconds, accumulatedSeconds);

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
