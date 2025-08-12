'use client';

import { useEffect, useRef, useState } from 'react';

import SelectTodoModal from '@/components/timer/SelectTodoModal';
import TimerButton from '@/components/timer/TimerButton';
import TimerModal from '@/components/timer/TimerModal';
import { useGoalsDashboard } from '@/hooks/useGoalDashboard';
import { GoalSummary } from '@/interfaces/goal';
import { TodoSummary } from '@/interfaces/todo';
import { getGoalBackgroundColorClass } from '@/lib/goalColors';

// 모달과 주고받을 스냅샷 타입
type TimerSnapshot = { baseTotalSec: number; resumeAtMs: number | null };

export default function TimerWidget() {
  const { data: goals = [] } = useGoalsDashboard();

  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalSummary | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<TodoSummary | null>(null);

  //  todoId별 타이머 스냅샷 캐시
  const [timerCache, setTimerCache] = useState<Record<number, TimerSnapshot>>({});

  // 플로팅 버튼 표시용 로컬 타이머
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const tickRef = useRef<number | null>(null);

  const startLocalTick = () => {
    if (tickRef.current != null) return;
    tickRef.current = window.setInterval(() => {
      setSeconds(prev => {
        const ns = prev + 1;
        if (ns >= 60) {
          setMinutes(m => m + 1);
          return 0;
        }
        return ns;
      });
    }, 1000);
    setIsRunning(true);
  };

  const stopLocalTick = () => {
    if (tickRef.current != null) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    setIsRunning(false);
  };

  // 선택 변경 시 버튼 타이머 리셋
  useEffect(() => {
    if (!selectedTodo) return;
    stopLocalTick();
    setMinutes(0);
    setSeconds(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTodo?.id]);

  useEffect(() => {
    return () => {
      if (tickRef.current != null) clearInterval(tickRef.current);
    };
  }, []);

  const handleWidgetClick = () => {
    if (!selectedGoal || !selectedTodo) {
      setIsSelectModalOpen(true);
      return;
    }
    setIsTimerModalOpen(true);
  };

  const handleSelectTodo = (goal: GoalSummary, todo: TodoSummary) => {
    setSelectedGoal(goal);
    setSelectedTodo(todo);
    setIsSelectModalOpen(false);
    setIsTimerModalOpen(true);
  };

  const handleCloseTimerModal = () => {
    setIsTimerModalOpen(false);
  };

  return (
    <>
      <TimerButton
        isRunning={isRunning}
        minutes={minutes}
        seconds={seconds}
        onClick={handleWidgetClick}
      />

      {isSelectModalOpen && (
        <SelectTodoModal
          goals={goals}
          onClose={() => setIsSelectModalOpen(false)}
          onSelect={handleSelectTodo}
        />
      )}

      {isTimerModalOpen && selectedGoal && selectedTodo && (
        <TimerModal
          onClose={handleCloseTimerModal}
          onBack={() => {
            setIsTimerModalOpen(false);
            setIsSelectModalOpen(true);
          }}
          goalTitle={selectedGoal.title}
          goalColor={getGoalBackgroundColorClass(selectedGoal.color)}
          todoContent={selectedTodo.title}
          todoId={String(selectedTodo.id)}
          minutes={minutes} // 초기값으로만 사용
          seconds={seconds} // 초기값으로만 사용
          isBlocked={false}
          // 버튼 동기화
          onStartTick={startLocalTick}
          onPauseTick={stopLocalTick}
          onStopTick={() => {
            stopLocalTick();
            setMinutes(0);
            setSeconds(0);
          }}
          // ⬇ 부모→모달 초기 하이드레이션
          initialSnapshot={timerCache[selectedTodo.id]}
          // ⬇ 모달→부모 최신 스냅샷 반영
          onSnapshot={(id, snap) => setTimerCache(prev => ({ ...prev, [id]: snap }))}
        />
      )}
    </>
  );
}
