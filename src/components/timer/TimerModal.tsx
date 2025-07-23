'use client';

import Modal from '@/components/ui/Modal';
import { formatTime, getCurrentSeconds, getTotalElapsedSeconds } from '@/lib/timerUtils';

import TaskInfo from './TaskInfo';
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
import TimerHeader from './TimerHeader';
import TotalTimeDisplay from './TotalTimerDisplay';

export interface TimerModalProps {
  onClose: () => void;
  onBack: () => void;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  isRunning: boolean;
  isBlocked: boolean;
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
  isBlocked,
  goalTitle,
  goalColor,
  todoContent,
  todoId: _todoId,
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
        {isBlocked === true && (
          <div className="text-error mb-4 rounded-md bg-red-100 px-4 py-2 text-center text-sm">
            이미 다른 할일의 타이머가 실행 중입니다.
          </div> //이 부분은 디자인이 추가 되면 색깔이나 크기 리팩토링 하겠습니다
        )}
        <TaskInfo goalTitle={goalTitle} goalColor={goalColor} todoContent={todoContent} />
        <TimerDisplay hours={hours} minutes={mm} seconds={ss} />
        <TimerControls
          isRunning={isRunning}
          isBlocked={isBlocked}
          onStart={onStart}
          onPause={onPause}
          onStop={onStop}
        />
        <TotalTimeDisplay totalH={totalH} totalM={totalM} totalS={totalS} />
      </div>
    </Modal>
  );
}
