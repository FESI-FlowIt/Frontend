'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

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
  const activeTodoId = useTimerStore(s => s.todoId);
  const mainStartAtMs = useTimerStore(s => s.mainStartAtMs);
  const resumeAtMs = useTimerStore(s => s.resumeAtMs);
  const mainBaseSec = useTimerStore(s => s.mainBaseSec);
  const hydrateFromServer = useTimerStore(s => s.hydrateFromServer);
  const ensureRunningAnchors = useTimerStore(s => s.ensureRunningAnchors);
  const now = useTimerStore(s => s.nowMs);
  const startClock = useTimerStore(s => s.startClock);

  const mainSeconds = useMemo(() => {
    const uiRunning = Boolean(isRunning && (mainStartAtMs != null || resumeAtMs != null));
    if (!uiRunning || !mainStartAtMs) return mainBaseSec;
    const delta = Math.floor((now - mainStartAtMs) / 1000);
    return Math.max(0, mainBaseSec + delta);
  }, [isRunning, mainStartAtMs, resumeAtMs, mainBaseSec, now]);

  const minutes = Math.floor(mainSeconds / 60);
  const seconds = mainSeconds % 60;

  /** 최초 하이드레이션 및 시계 시작 */
  useEffect(() => {
    startClock();
    hydrateFromServer(null);
    ensureRunningAnchors();
  }, [hydrateFromServer, ensureRunningAnchors, startClock]);

  /** 선택 모달이 열릴 때만 refetch */
  useEffect(() => {
    if (isSelectModalOpen) refetch?.();
  }, [isSelectModalOpen, refetch]);

  /** 완료 브로드캐스트 수신 → 로컬 완료집합 업데이트 */
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

  /** 스토어의 activeTodoId 기반으로 선택 자동 복원
   *  ⛔ 정지(stop) 후 activeTodoId가 null이어도 선택을 지우지 않아 모달이 유지되도록 함
   */
  const syncSelectedFromStore = useCallback(() => {
    if (activeTodoId == null) {
      // 선택을 유지해야 모달이 언마운트되지 않음
      return;
    }
    for (const g of goals) {
      const t = g.todos?.find(td => String(td.id) === String(activeTodoId));
      if (t && !t.isDone) {
        setSelectedGoal(g);
        setSelectedTodo(t);
        return;
      }
    }
    // 목록에 없거나 완료되었으면 해제
    setSelectedGoal(null);
    setSelectedTodo(null);
  }, [activeTodoId, goals]);

  useEffect(() => {
    syncSelectedFromStore();
  }, [syncSelectedFromStore]);

  const isSelectedTodoUsable = useMemo(() => {
    if (!selectedGoal || !selectedTodo) return false;
    if (completedIds.has(String(selectedTodo.id))) return false;
    const latestGoal = goals.find(g => String(g.goalId) === String(selectedGoal.goalId));
    const latestTodo = latestGoal?.todos.find(t => String(t.id) === String(selectedTodo.id));
    return Boolean(latestTodo && !latestTodo.isDone);
  }, [goals, selectedGoal, selectedTodo, completedIds]);

  const handleWidgetClick = () => {
    const hasUsable = selectedGoal && selectedTodo && isSelectedTodoUsable;
    if (hasUsable) {
      setIsTimerModalOpen(true);
    } else {
      setIsSelectModalOpen(true);
    }
  };

  const handleSelectTodo = (goal: GoalSummary, todo: TodoSummary) => {
    setSelectedGoal(goal);
    setSelectedTodo(todo);
    setIsSelectModalOpen(false);
    setIsTimerModalOpen(true);
  };

  /** 진짜 '완료' 상황에서만 호출해 목록에서 제거 */
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
          }}
          // ⛔ 정지 시 모달 닫히지 않도록 onStopped 전달 없음
          // onStopped={() => { setIsTimerModalOpen(false); }}
          goalTitle={selectedGoal.title}
          goalColor={getGoalBackgroundColorClass(selectedGoal.color)}
          todoContent={selectedTodo.title}
          todoId={String(selectedTodo.id)}
        />
      )}
    </>
  );
}
