'use client';

import { useEffect, useMemo, useState } from 'react';

import SelectTodoModal from '@/components/timer/SelectTodoModal';
import TimerButton from '@/components/timer/TimerButton';
import TimerModal from '@/components/timer/TimerModal';
import { useGoals } from '@/hooks/useGoals';
import { GoalSummary } from '@/interfaces/goal';
import { TodoSummary } from '@/interfaces/todo';
import { getGoalBackgroundColorClass } from '@/lib/goalColors';
import { useTimerStore } from '@/store/timerStore';

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
    ).map((t: any) => {
      const status = String(t?.status ?? '').toUpperCase();
      return {
        id: t.id ?? t.todoId,
        title: t.title ?? t.todoName ?? t.name ?? '',
        isDone: Boolean(t?.isDone ?? t?.done) || status === 'DONE' || t?.completedAt != null,
      } as TodoSummary;
    }),
  })) as GoalSummary[];
}

export default function TimerWidget() {
  const { data, refetch } = useGoals() as { data: any; refetch?: () => void };
  const goals: GoalSummary[] = useMemo(() => toGoalSummaryArray(data), [data]);

  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const goalsForSelect: GoalSummary[] = useMemo(
    () =>
      goals.map(g => ({
        ...g,
        todos: (g.todos ?? []).filter(t => !t.isDone && !completedIds.has(String(t.id))),
      })),
    [goals, completedIds],
  );

  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalSummary | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<TodoSummary | null>(null);

  const isRunning = useTimerStore(s => s.isRunning);
  const mainStartAtMs = useTimerStore(s => s.mainStartAtMs);
  const mainBaseSec = useTimerStore(s => s.mainBaseSec);
  const hydrateFromServer = useTimerStore(s => s.hydrateFromServer);
  const ensureRunningAnchors = useTimerStore(s => s.ensureRunningAnchors);
  const now = useTimerStore(s => s.nowMs);
  const startClock = useTimerStore(s => s.startClock);

  const mainSeconds = useMemo(() => {
    if (!isRunning || !mainStartAtMs) return mainBaseSec;
    const delta = Math.floor((now - mainStartAtMs) / 1000);
    return Math.max(0, mainBaseSec + delta);
  }, [isRunning, mainStartAtMs, mainBaseSec, now]);

  const minutes = Math.floor(mainSeconds / 60);
  const seconds = mainSeconds % 60;

  useEffect(() => {
    startClock();
    hydrateFromServer(null);
    ensureRunningAnchors();
  }, [hydrateFromServer, ensureRunningAnchors, startClock]);

  useEffect(() => {
    if (isSelectModalOpen) refetch?.();
  }, [isSelectModalOpen, refetch]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { id } = (e as CustomEvent<{ id?: string | number }>).detail ?? {};
      if (id == null) return;

      const key = String(id);
      setCompletedIds(prev => {
        if (prev.has(key)) return prev;
        const next = new Set(prev);
        next.add(key);
        return next;
      });
    };

    window.addEventListener('todo:completed', handler);
    return () => window.removeEventListener('todo:completed', handler);
  }, []);

  const isSelectedTodoUsable = useMemo(() => {
    if (!selectedGoal || !selectedTodo) return false;
    if (completedIds.has(String(selectedTodo.id))) return false;
    const latestGoal = goals.find(g => String(g.goalId) === String(selectedGoal.goalId));
    const latestTodo = latestGoal?.todos.find(t => String(t.id) === String(selectedTodo.id));
    return Boolean(latestTodo && !latestTodo.isDone);
  }, [goals, selectedGoal, selectedTodo, completedIds]);

  const handleWidgetClick = () => {
    if (!selectedGoal || !selectedTodo || !isSelectedTodoUsable) {
      refetch?.();
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

  const handleTodoCompleted = (todoId: number | string) => {
    const key = String(todoId);
    setCompletedIds(prev => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
    if (selectedTodo && String(selectedTodo.id) === key) {
      setIsTimerModalOpen(false);
      setSelectedTodo(null);
      setIsSelectModalOpen(true);
    }
    refetch?.();
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
          goals={goalsForSelect}
          onClose={() => setIsSelectModalOpen(false)}
          onSelect={handleSelectTodo}
          defaultSelectedGoalId={selectedGoal ? String(selectedGoal.goalId) : null}
        />
      )}

      {isTimerModalOpen && selectedGoal && selectedTodo && isSelectedTodoUsable && (
        <TimerModal
          onClose={() => setIsTimerModalOpen(false)}
          onBack={() => {
            setIsTimerModalOpen(false);
            setIsSelectModalOpen(true);
            refetch?.();
          }}
          onComplete={handleTodoCompleted}
          goalTitle={selectedGoal.title}
          goalColor={getGoalBackgroundColorClass(selectedGoal.color)}
          todoContent={selectedTodo.title}
          todoId={String(selectedTodo.id)}
        />
      )}
    </>
  );
}
