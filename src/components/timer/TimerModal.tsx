'use client';

import { useEffect, useMemo, useCallback } from 'react';

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
  onStopped?: (todoId: number | string) => void;
}

export default function TimerModal(props: TimerModalProps) {
  const { onClose, onBack, goalTitle, goalColor, todoContent, todoId, onStopped } = props;

  const numericTodoId = useMemo(() => {
    const n = Number(todoId);
    return Number.isFinite(n) ? n : null;
  }, [todoId]);

  const isRunning = useTimerStore(s => s.isRunning);
  const runningTodoId = useTimerStore(s => s.todoId);
  const lastTodoId = useTimerStore(s => s.lastTodoId);

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

  // 실행 중이면 runningTodoId, 일시정지/정지면 lastTodoId 기준으로 동일성 판정
  const sameTodo = useMemo(() => {
    if (numericTodoId == null) return false;
    if (isRunning) return runningTodoId != null && runningTodoId === numericTodoId;
    return lastTodoId != null && lastTodoId === numericTodoId;
  }, [isRunning, runningTodoId, lastTodoId, numericTodoId]);

  const uiRunning = useMemo(
    () => Boolean(isRunning && (mainStartAtMs != null || resumeAtMs != null)),
    [isRunning, mainStartAtMs, resumeAtMs],
  );

  const mainSeconds = useMemo(() => {
    if (!sameTodo) return 0;
    if (uiRunning && mainStartAtMs) {
      const delta = Math.floor((now - mainStartAtMs) / 1000);
      return Math.max(0, mainBaseSec + delta);
    }
    return Math.max(0, mainBaseSec);
  }, [sameTodo, uiRunning, mainStartAtMs, mainBaseSec, now]);

  const { hours, minutes, seconds } = formatTime(mainSeconds);

  const liveTotalSec = useMemo(() => {
    if (!sameTodo) return getTotalFor(numericTodoId);
    if (!uiRunning || !resumeAtMs) return getTotalFor(numericTodoId);
    const delta = Math.floor((now - resumeAtMs) / 1000);
    return Math.max(getTotalFor(numericTodoId), getTotalFor(numericTodoId) + Math.max(0, delta));
  }, [sameTodo, uiRunning, resumeAtMs, now, getTotalFor, numericTodoId]);

  const handleStopped = useCallback(() => {
    if (numericTodoId == null) return;
    onStopped?.(numericTodoId);
  }, [numericTodoId, onStopped]);

  return (
    <Modal isOpen onClose={onClose} size="timer">
      <div role="dialog" aria-label="타이머 모달" className="h-464 w-311 pr-40 md:w-520 md:pr-0">
        <TimerHeader onBack={onBack} onClose={onClose} />

        <TaskInfo goalTitle={goalTitle} goalColor={goalColor} todoContent={todoContent} />
        <TimerDisplay hours={hours} minutes={minutes} seconds={seconds} />

        <TimerControls todoId={numericTodoId} onStopped={handleStopped} />

        <div className="mt-72 md:mt-0">
          <TotalTime serverTotalTime={toHHMMSS(liveTotalSec)} />
        </div>
      </div>
    </Modal>
  );
}
