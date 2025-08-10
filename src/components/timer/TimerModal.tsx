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

const hmsToSec = (hms: string) => {
  const [h = '0', m = '0', s = '0'] = (hms ?? '00:00:00').split(':');
  return (+h || 0) * 3600 + (+m || 0) * 60 + (+s || 0);
};

function clampResumeStartMs(ms?: number | null) {
  const now = Date.now();
  if (!ms) return now;
  return ms < now - 2000 ? now : ms;
}

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

  /** 누적 시간(서버 기준 + 로컬 달리는 구간 delta) */
  const [baseTotalSec, setBaseTotalSec] = useState<number>(initialSnapshot?.baseTotalSec ?? 0);
  const totalResumeAtMsRef = useRef<number | null>(initialSnapshot?.resumeAtMs ?? null);
  const totalTickRef = useRef<number | null>(null);

  // 인플라이트 가드(더블 클릭 방지)
  const pauseInFlightRef = useRef(false);
  const stopInFlightRef = useRef(false);

  // 표시 누적(초)
  const liveTotalSec =
    baseTotalSec +
    (totalResumeAtMsRef.current ? Math.floor((Date.now() - totalResumeAtMsRef.current) / 1000) : 0);

  // 1초마다 누적 표시 리렌더(메인 달릴 때만)
  useEffect(() => {
    if (!isRunning) {
      if (totalTickRef.current) {
        clearInterval(totalTickRef.current);
        totalTickRef.current = null;
      }
      return;
    }
    if (totalTickRef.current) clearInterval(totalTickRef.current);
    totalTickRef.current = window.setInterval(() => {
      setBaseTotalSec(prev => prev); // 강제 리렌더
    }, 1000);
    return () => {
      if (totalTickRef.current) clearInterval(totalTickRef.current);
    };
  }, [isRunning]);

  // 서버 총시간을 하향 갱신 없이 반영
  const updateBaseFromServer = async (todoId: number) => {
    const res = await timerApi.getTotalRunningTime(todoId);
    const serverSec = hmsToSec(res.totalRunningTime ?? '00:00:00');
    setBaseTotalSec(prev => Math.max(prev, serverSec));
  };

  // 최초 진입/할일 변경 시 서버 동기화 (자동 시작/정지 판단만)
  useEffect(() => {
    if (!effectiveTodoId) return;

    (async () => {
      try {
        const [total, status] = await Promise.all([
          timerApi.getTotalRunningTime(effectiveTodoId),
          timerApi.getCurrentTimerStatus().catch(() => null),
        ]);

        // 1) 서버 누적 반영 (하향 갱신 금지)
        const sec = hmsToSec(total.totalRunningTime ?? '00:00:00');
        setBaseTotalSec(prev => Math.max(prev, sec));

        // 2) 서버가 실행 중이고 동일 todo면만 이어 달리기
        const canAutoStart =
          !!status && status.isRunning && Number(status.todoId) === effectiveTodoId;

        if (canAutoStart) {
          const startedMs = (status as any)?.resumeDateTime
            ? new Date((status as any).resumeDateTime).getTime()
            : status?.startedDateTime
              ? new Date(status.startedDateTime).getTime()
              : Date.now();

          const now = Date.now();
          const sessionSec = Math.floor((now - startedMs) / 1000);

          // 메인/누적 앵커 정렬
          mainPausedAccumRef.current = sessionSec;
          setMainSeconds(sessionSec);
          mainStartAtMsRef.current = now;
          setIsRunning(true);
          startMainInterval();

          totalResumeAtMsRef.current = startedMs;
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
  const handleStart = async (resumeAtMs?: number) => {
    try {
      if (effectiveTodoId) await updateBaseFromServer(effectiveTodoId);
    } catch {}

    const now = Date.now();
    const currentMainSec = mainStartAtMsRef.current ? computeMainSeconds() : mainSeconds;

    // 🔹 메인 시계는 이어서 보이도록 앵커 정렬
    mainPausedAccumRef.current = currentMainSec;
    mainStartAtMsRef.current = now;
    setIsRunning(true);
    setMainSeconds(currentMainSec);
    startMainInterval();

    // ✅ 누적(delta)은 "지금부터" 다시 시작 (과거로 되감지 말 것!)
    totalResumeAtMsRef.current = resumeAtMs
      ? clampResumeStartMs(resumeAtMs) // 서버가 resume 시각을 주면 그걸 사용
      : now; // 없으면 현재 시각부터 새 델타 시작

    onStartTick();
  };

  const handlePause = async () => {
    if (!effectiveTodoId) return;
    if (pauseInFlightRef.current) return;
    pauseInFlightRef.current = true;

    // 1) UI 먼저 멈춤
    pauseMain();

    // 2) 지금 순간의 live = base + delta 를 한 번만 고정
    const delta = totalResumeAtMsRef.current
      ? Math.floor((Date.now() - totalResumeAtMsRef.current) / 1000)
      : 0;
    const liveNow = baseTotalSec + delta;
    setBaseTotalSec(liveNow);
    totalResumeAtMsRef.current = null;

    // 3) 버튼 동기화
    onPauseTick();

    // 4) 서버 재조회는 생략(중복 가산 방지). 다음 진입 시 보정됨.
    pauseInFlightRef.current = false;
  };

  const handleStop = async () => {
    if (!effectiveTodoId) return;
    if (stopInFlightRef.current) return;
    stopInFlightRef.current = true;

    // 1) UI 먼저 멈추기
    pauseMain();

    // 2) live 고정 후 메인 리셋
    const delta = totalResumeAtMsRef.current
      ? Math.floor((Date.now() - totalResumeAtMsRef.current) / 1000)
      : 0;
    const liveNow = baseTotalSec + delta;
    setBaseTotalSec(liveNow);
    totalResumeAtMsRef.current = null;

    resetMain();
    onStopTick();

    // 3) 서버 재조회 생략
    stopInFlightRef.current = false;
  };

  /** 언마운트: 최신 스냅샷을 부모로 넘김 */
  useEffect(() => {
    return () => {
      let finalBase = baseTotalSec;
      let finalResume = totalResumeAtMsRef.current;

      if (totalResumeAtMsRef.current) {
        const delta = Math.floor((Date.now() - totalResumeAtMsRef.current) / 1000);
        finalBase = baseTotalSec + delta;
      } else {
        finalResume = null;
      }

      onSnapshot?.(numericTodoId, {
        baseTotalSec: finalBase,
        resumeAtMs: finalResume,
      });

      if (mainTickRef.current) clearInterval(mainTickRef.current);
      if (totalTickRef.current) clearInterval(totalTickRef.current);
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
            onPause={handlePause}
            onStop={handleStop}
          />
        )}

        <TotalTime serverTotalTime={toHHMMSS(liveTotalSec)} />
      </div>
    </Modal>
  );
}
