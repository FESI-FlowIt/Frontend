'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import SelectTodoModal from '@/components/timer/SelectTodoModal';
import TimerButton from '@/components/timer/TimerButton';
import TimerModal from '@/components/timer/TimerModal';
import { useGoals } from '@/hooks/useGoals';
import { GoalSummary } from '@/interfaces/goal';
import { TodoSummary } from '@/interfaces/todo';
import { getGoalBackgroundColorClass } from '@/lib/goalColors';

type TimerSnapshot = { baseTotalSec: number; resumeAtMs: number | null };

function toGoalSummaryArray(input: any): GoalSummary[] {
  if (!input) return [];

  if (Array.isArray(input)) return input as GoalSummary[];

  const arr =
    (Array.isArray(input?.result) && input.result) ||
    (Array.isArray(input?.data) && input.data) ||
    (Array.isArray(input?.goals) && input.goals) ||
    (Array.isArray(input?.items) && input.items) ||
    (Array.isArray(input?.content) && input.content) ||
    [];

  return (arr as any[]).map(g => ({
    goalId: g.goalId ?? g.id,
    title: g.title ?? g.name ?? g.goalName ?? '',
    color: g.color ?? g.hex ?? '',
    isPinned: Boolean(g.isPinned ?? g.pinned),
    createdAt: g.createdAt ?? g.createDateTime ?? g.createdDate ?? null,
    todos: (
      (Array.isArray(g.todos) && g.todos) ||
      (Array.isArray(g.todoList) && g.todoList) ||
      []
    ).map((t: any) => ({
      id: t.id ?? t.todoId,
      title: t.title ?? t.todoName ?? t.name ?? '',
      isDone: Boolean(t.isDone ?? t.done),
    })),
  })) as GoalSummary[];
}

export default function TimerWidget() {
  const { data } = useGoals();
  const goals: GoalSummary[] = useMemo(() => toGoalSummaryArray(data), [data]);

  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalSummary | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<TodoSummary | null>(null);

  const [timerCache, setTimerCache] = useState<Record<number, TimerSnapshot>>({});
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

  useEffect(() => {
    if (!selectedTodo) return;
    stopLocalTick();
    setMinutes(0);
    setSeconds(0);
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

  const handleCloseTimerModal = () => setIsTimerModalOpen(false);

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
          minutes={minutes}
          seconds={seconds}
          isBlocked={false}
          onStartTick={startLocalTick}
          onPauseTick={stopLocalTick}
          onStopTick={() => {
            stopLocalTick();
            setMinutes(0);
            setSeconds(0);
          }}
          initialSnapshot={timerCache[selectedTodo.id]}
          onSnapshot={(id, snap) => setTimerCache(prev => ({ ...prev, [id]: snap }))}
        />
      )}
    </>
  );
}
