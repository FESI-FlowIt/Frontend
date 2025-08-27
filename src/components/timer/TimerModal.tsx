'use client';

import { useEffect, useMemo } from 'react';

import Modal from '@/components/ui/Modal';
import { formatTime } from '@/lib/timerUtils';
import { useTimerStore } from '@/store/timerStore';

import TaskInfo from './TaskInfo';
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
import TimerHeader from './TimerHeader';
import TotalTime from './TotalTime';

const toHHMMSS = (sec: number) => {
  const h = String(Math.floor(sec / 3600)).padStart(2, '0');
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
};

interface TimerModalProps {
  onClose: () => void;
  onBack: () => void;
  goalTitle: string;
  goalColor: string;
  todoContent: string;
  todoId: string;
  onComplete?: (todoId: number | string) => void;
}

export default function TimerModal({
  onClose,
  onBack,
  goalTitle,
  goalColor,
  todoContent,
  todoId,
}: TimerModalProps) {
  const numericTodoId = useMemo(() => {
    const n = Number(todoId);
    return Number.isFinite(n) ? n : null;
  }, [todoId]);

  const isRunning = useTimerStore(s => s.isRunning);
  const runningTodoId = useTimerStore(s => s.todoId);

  const resumeAtMs = useTimerStore(s => s.resumeAtMs);
  const mainStartAtMs = useTimerStore(s => s.mainStartAtMs);
  const mainBaseSec = useTimerStore(s => s.mainBaseSec);

  const getTotalFor = useTimerStore(s => s.getTotalFor);
  const fetchTotalFor = useTimerStore(s => s.fetchTotalFor);

  const startClock = useTimerStore(s => s.startClock);
  const now = useTimerStore(s => s.nowMs);

  useEffect(() => {
    startClock();
    if (numericTodoId != null) {
      fetchTotalFor(numericTodoId);
    }
  }, [startClock, fetchTotalFor, numericTodoId]);

  const blocked = useMemo(() => {
    return Boolean(
      isRunning &&
        runningTodoId != null &&
        numericTodoId != null &&
        runningTodoId !== numericTodoId,
    );
  }, [isRunning, runningTodoId, numericTodoId]);

  const mainSeconds = useMemo(() => {
    const sameTodo =
      runningTodoId != null && numericTodoId != null && runningTodoId === numericTodoId;
    if (sameTodo) {
      if (isRunning && mainStartAtMs) {
        const delta = Math.floor((now - mainStartAtMs) / 1000);
        return Math.max(0, mainBaseSec + delta);
      }

      return Math.max(0, mainBaseSec);
    }

    return 0;
  }, [runningTodoId, numericTodoId, isRunning, mainStartAtMs, mainBaseSec, now]);

  const { hours, minutes, seconds } = formatTime(mainSeconds);

  const liveTotalSec = useMemo(() => {
    const base = getTotalFor(numericTodoId);
    const sameTodo =
      runningTodoId != null && numericTodoId != null && runningTodoId === numericTodoId;
    if (!sameTodo || !isRunning || !resumeAtMs) return base;
    const delta = Math.floor((now - resumeAtMs) / 1000);
    return Math.max(base, base + Math.max(0, delta));
  }, [getTotalFor, numericTodoId, runningTodoId, isRunning, resumeAtMs, now]);

  return (
    <Modal isOpen onClose={onClose} size="timer">
      <div className="h-464 w-311 pr-40 md:w-520 md:pr-0">
        <TimerHeader onBack={onBack} onClose={onClose} />

        {blocked && (
          <div className="text-error -mt-32 mb-12 rounded-md bg-red-100 px-8 py-2 text-center text-sm md:-mt-20">
            이미 다른 할일의 타이머 실행 중
          </div>
        )}

        <TaskInfo goalTitle={goalTitle} goalColor={goalColor} todoContent={todoContent} />
        <TimerDisplay hours={hours} minutes={minutes} seconds={seconds} />

        <TimerControls todoId={numericTodoId} />

        <div className="mt-72 md:mt-0">
          <TotalTime serverTotalTime={toHHMMSS(liveTotalSec)} />
        </div>
      </div>
    </Modal>
  );
}
