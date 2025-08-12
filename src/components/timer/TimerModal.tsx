'use client';

import { useEffect, useRef, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { formatTime, getCurrentSeconds } from '@/lib/timerUtils';
import TaskInfo from './TaskInfo';
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
import TimerHeader from './TimerHeader';
import TotalTime from './TotalTime';
import { timerApi } from '@/api/timerApi';

export interface TimerSnapshot {
  baseTotalSec: number;
  resumeAtMs: number | null;
}

export interface TimerModalProps {
  onClose: () => void;
  onBack: () => void;
  goalTitle: string;
  goalColor: string;
  todoContent: string;
  todoId: string;
  minutes: number;
  seconds: number;

  isBlocked: boolean;
  onStartTick: () => void;
  onPauseTick: () => void;
  onStopTick: () => void;
  initialSnapshot?: TimerSnapshot;
  onSnapshot?: (todoIdNum: number, snapshot: TimerSnapshot) => void;
}

const toHHMMSS = (sec: number) => {
  const h = String(Math.floor(sec / 3600)).padStart(2, '0');
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
};

export default function TimerModal({
  onClose,
  onBack,
  goalTitle,
  goalColor,
  todoContent,
  todoId: _todoId,
  minutes,
  seconds,
  onStartTick,
  onPauseTick,
  onStopTick,
  initialSnapshot,
  onSnapshot,
}: TimerModalProps) {
  const numericTodoId = Number(_todoId);
  const initialId = Number.isInteger(numericTodoId) && numericTodoId > 0 ? numericTodoId : null;
  const [effectiveTodoId, setEffectiveTodoId] = useState<number | null>(initialId);

  /** 메인 타이머(큰 시계) */
  const [isRunning, setIsRunning] = useState(false);
  const mainStartAtMsRef = useRef<number | null>(null);
  const mainPausedAccumRef = useRef<number>(getCurrentSeconds(minutes, seconds));
  const [mainSeconds, setMainSeconds] = useState(mainPausedAccumRef.current);
  const mainTickRef = useRef<number | null>(null);

  const computeMainSeconds = () => {
    const base = mainPausedAccumRef.current;
    if (!mainStartAtMsRef.current) return base;
    return base + Math.floor((Date.now() - mainStartAtMsRef.current) / 1000);
  };

  const startMainInterval = () => {
    if (mainTickRef.current) clearInterval(mainTickRef.current);
    mainTickRef.current = window.setInterval(() => setMainSeconds(computeMainSeconds()), 1000);
  };

  const pauseMain = () => {
    if (!isRunning) return;
    const current = computeMainSeconds();
    mainPausedAccumRef.current = current;
    mainStartAtMsRef.current = null;
    setIsRunning(false);
    if (mainTickRef.current) {
      clearInterval(mainTickRef.current);
      mainTickRef.current = null;
    }
    setMainSeconds(current);
  };

  const resetMain = () => {
    setIsRunning(false);
    mainStartAtMsRef.current = null;
    mainPausedAccumRef.current = 0;
    if (mainTickRef.current) {
      clearInterval(mainTickRef.current);
      mainTickRef.current = null;
    }
    setMainSeconds(0);
  };

  /** 누적 시간(서버 확정값 + 실행중 표시용 델타) */
  const [baseTotalSec, setBaseTotalSec] = useState<number>(initialSnapshot?.baseTotalSec ?? 0);
  const baseTotalSecRef = useRef(baseTotalSec);
  useEffect(() => {
    baseTotalSecRef.current = baseTotalSec;
  }, [baseTotalSec]);

  // 실행 중 표시용 앵커 (멈추면 null)
  const totalResumeAtMsRef = useRef<number | null>(initialSnapshot?.resumeAtMs ?? null);

  // 화면 표시값 = 서버 확정값 + (달리는 중이면 now - resumeAt)
  const liveTotalSec =
    baseTotalSec +
    (totalResumeAtMsRef.current ? Math.floor((Date.now() - totalResumeAtMsRef.current) / 1000) : 0);

  // 서버 총시간을 하향 갱신 없이 반영
  const updateBaseFromServer = async (todoId: number) => {
    const res = await timerApi.getTotalRunningTime(todoId);
    const [h = '0', m = '0', s = '0'] = (res.totalRunningTime ?? '00:00:00').split(':');
    const serverSec = (+h || 0) * 3600 + (+m || 0) * 60 + (+s || 0);
    setBaseTotalSec(prev => Math.max(prev, serverSec));
  };

  /** 블록 상태(다른 할일이 달리는 중인지) */
  const [blocked, setBlocked] = useState(false);

  /** 0) 모달 첫 오픈 시, 부모 스냅샷으로 즉시 복원 */
  useEffect(() => {
    if (!initialSnapshot) return;
    setBaseTotalSec(prev => Math.max(prev, initialSnapshot.baseTotalSec));

    if (initialSnapshot.resumeAtMs) {
      const elapsed = Math.floor((Date.now() - initialSnapshot.resumeAtMs) / 1000);
      const seed = Math.max(0, elapsed);
      mainPausedAccumRef.current = seed;
      setMainSeconds(seed);
      mainStartAtMsRef.current = Date.now();
      setIsRunning(true);
      startMainInterval();
      totalResumeAtMsRef.current = initialSnapshot.resumeAtMs;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /** 1) 최초 진입/할일 변경: 서버와 동기화 + 블록 판정 */
  useEffect(() => {
    if (!effectiveTodoId) return;
    (async () => {
      try {
        const [total, status] = await Promise.all([
          timerApi.getTotalRunningTime(effectiveTodoId),
          timerApi.getCurrentTimerStatus().catch(() => null),
        ]);

        const [h = '0', m = '0', s = '0'] = (total.totalRunningTime ?? '00:00:00').split(':');
        const sec = (+h || 0) * 3600 + (+m || 0) * 60 + (+s || 0);
        setBaseTotalSec(prev => Math.max(prev, sec));

        const running = status && (status as any).isRunning && Number((status as any).todoId);
        const runningTodoId = running ? Number((status as any).todoId) : null;
        const isSame = runningTodoId === effectiveTodoId;

        //  다른 할일이 달리는 중이면 블록
        setBlocked(Boolean(runningTodoId && !isSame));

        if (runningTodoId && isSame) {
          const now = Date.now();
          const prevAccum = mainPausedAccumRef.current;
          setMainSeconds(prevAccum);
          mainStartAtMsRef.current = now;
          setIsRunning(true);
          startMainInterval();
          if (!totalResumeAtMsRef.current) {
            totalResumeAtMsRef.current = initialSnapshot?.resumeAtMs ?? now;
          }
        } else {
          totalResumeAtMsRef.current = null;
          pauseMain();
        }
      } catch {
        setBlocked(false);
        totalResumeAtMsRef.current = null;
        pauseMain();
      }
    })();
  }, [effectiveTodoId]); // eslint-disable-line react-hooks/exhaustive-deps

  /** 2) 시작/일시정지/정지 동작 */
  const handleStart = async () => {
    try {
      if (effectiveTodoId) await updateBaseFromServer(effectiveTodoId);
    } catch {}
    const now = Date.now();
    const currentMainSec = mainStartAtMsRef.current ? computeMainSeconds() : mainSeconds;

    mainPausedAccumRef.current = currentMainSec;
    mainStartAtMsRef.current = now;
    setIsRunning(true);
    setMainSeconds(currentMainSec);
    startMainInterval();

    totalResumeAtMsRef.current = totalResumeAtMsRef.current ?? now;
    onStartTick();
  };

  const handlePause = (finalServerSec?: number) => {
    if (totalResumeAtMsRef.current) {
      const delta = Math.floor((Date.now() - totalResumeAtMsRef.current) / 1000);
      setBaseTotalSec(prev => prev + delta);
    }
    pauseMain();
    onPauseTick();
    totalResumeAtMsRef.current = null;

    if (typeof finalServerSec === 'number' && Number.isFinite(finalServerSec)) {
      setBaseTotalSec(prev => Math.max(prev, finalServerSec));
    } else if (effectiveTodoId) {
      updateBaseFromServer(effectiveTodoId).catch(() => {});
    }
  };

  const handleStop = (finalServerSec?: number) => {
    if (totalResumeAtMsRef.current) {
      const delta = Math.floor((Date.now() - totalResumeAtMsRef.current) / 1000);
      setBaseTotalSec(prev => prev + delta);
    }
    pauseMain();
    totalResumeAtMsRef.current = null;
    resetMain();
    onStopTick();

    if (typeof finalServerSec === 'number' && Number.isFinite(finalServerSec)) {
      setBaseTotalSec(prev => Math.max(prev, finalServerSec));
    } else if (effectiveTodoId) {
      updateBaseFromServer(effectiveTodoId).catch(() => {});
    }
  };

  /** 언마운트: 최신 스냅샷 전달(로컬 합산 금지) */
  useEffect(() => {
    return () => {
      onSnapshot?.(numericTodoId, {
        baseTotalSec: baseTotalSecRef.current,
        resumeAtMs: totalResumeAtMsRef.current,
      });
      if (mainTickRef.current) clearInterval(mainTickRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { hours, minutes: mm, seconds: ss } = formatTime(mainSeconds);

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

        <TimerDisplay hours={hours} minutes={mm} seconds={ss} />

        {effectiveTodoId !== null && (
          <TimerControls
            todoId={effectiveTodoId}
            onSyncTodoId={setEffectiveTodoId}
            isRunning={isRunning}
            isBlocked={blocked}
            setIsRunning={flag => (flag ? setIsRunning(true) : pauseMain())}
            onStart={handleStart}
            onPause={handlePause}
            onStop={handleStop}
          />
        )}

        <div className="mt-72 md:mt-0">
          <TotalTime serverTotalTime={toHHMMSS(liveTotalSec)} />
        </div>
      </div>
    </Modal>
  );
}
