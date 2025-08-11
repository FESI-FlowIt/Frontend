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
  isBlocked,
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

  // 최초 진입/할일 변경
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

        if (status && status.isRunning && Number(status.todoId) === effectiveTodoId) {
          const now = Date.now();
          mainPausedAccumRef.current = 0;
          setMainSeconds(0);
          mainStartAtMsRef.current = now;
          setIsRunning(true);
          startMainInterval();
          totalResumeAtMsRef.current = now; // 표시용 앵커(서버 합산과 무관)
        } else {
          totalResumeAtMsRef.current = null;
          pauseMain();
        }
      } catch {
        totalResumeAtMsRef.current = null;
        pauseMain();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveTodoId]);

  /** 시작/일시정지/정지 동작 */
  const handleStart = async () => {
    try {
      if (effectiveTodoId) await updateBaseFromServer(effectiveTodoId);
    } catch {}
    const now = Date.now();
    const currentMainSec = mainStartAtMsRef.current ? computeMainSeconds() : mainSeconds;

    // 시계는 이어서 보이도록
    mainPausedAccumRef.current = currentMainSec;
    mainStartAtMsRef.current = now;
    setIsRunning(true);
    setMainSeconds(currentMainSec);
    startMainInterval();

    // 표시용 델타 시작(누적 합산은 서버가 담당)
    totalResumeAtMsRef.current = now;
    onStartTick();
  };

  // Controls에서 서버 누적을 넘겨줌 — 로컬 델타는 절대 더하지 않음
  // ⬇ 기존 handlePause 교체
  const handlePause = (finalServerSec?: number) => {
    // 0) 지금까지 달린 델타(표시용) 먼저 확정해서 즉시 8초처럼 보이게
    if (totalResumeAtMsRef.current) {
      const delta = Math.floor((Date.now() - totalResumeAtMsRef.current) / 1000);
      setBaseTotalSec(prev => prev + delta);
    }

    // 1) UI 멈춤 + 표시용 앵커 종료
    pauseMain();
    onPauseTick();
    totalResumeAtMsRef.current = null;

    // 2) 서버 값과 상향 동기화 (서버가 바로 안 올려도 로컬 8초 유지)
    if (typeof finalServerSec === 'number' && Number.isFinite(finalServerSec)) {
      setBaseTotalSec(prev => Math.max(prev, finalServerSec));
    } else if (effectiveTodoId) {
      updateBaseFromServer(effectiveTodoId).catch(() => {});
    }
  };

  // ⬇ 기존 handleStop 교체
  const handleStop = (finalServerSec?: number) => {
    // 0) 지금까지 달린 델타를 먼저 확정 (정지 시에도 즉시 합산)
    if (totalResumeAtMsRef.current) {
      const delta = Math.floor((Date.now() - totalResumeAtMsRef.current) / 1000);
      setBaseTotalSec(prev => prev + delta);
    }

    // 1) UI 멈춤 + 표시용 앵커 종료
    pauseMain();
    totalResumeAtMsRef.current = null; // 로컬 추가 가산 중단
    resetMain();
    onStopTick();

    // 2) 서버 값과 상향 동기화
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { hours, minutes: mm, seconds: ss } = formatTime(mainSeconds);

  return (
    <Modal isOpen onClose={onClose} size="timer">
      <div className="w-520 p-10">
        <TimerHeader onBack={onBack} onClose={onClose} />

        {isBlocked && (
          <div className="text-error mb-4 rounded-md bg-red-100 px-4 py-2 text-center text-sm">
            이미 다른 할일의 타이머가 실행 중입니다.
          </div>
        )}

        <TaskInfo goalTitle={goalTitle} goalColor={goalColor} todoContent={todoContent} />

        <TimerDisplay hours={hours} minutes={mm} seconds={ss} />

        {effectiveTodoId !== null && (
          <TimerControls
            todoId={effectiveTodoId}
            onSyncTodoId={setEffectiveTodoId}
            isRunning={isRunning}
            isBlocked={isBlocked}
            setIsRunning={flag => (flag ? setIsRunning(true) : pauseMain())}
            onStart={handleStart}
            onPause={handlePause} // 서버 누적초 수신
            onStop={handleStop} // 서버 누적초 수신
          />
        )}

        <TotalTime serverTotalTime={toHHMMSS(liveTotalSec)} />
      </div>
    </Modal>
  );
}
