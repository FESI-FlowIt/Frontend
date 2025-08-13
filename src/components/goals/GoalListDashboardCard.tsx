'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { todosApi } from '@/api/todosApi';
import GoalIcon from '@/assets/icons/goal.svg';
import { GoalSummary } from '@/interfaces/goal';
import { TodoSummary } from '@/interfaces/todo';
import { getGoalTextColorClass } from '@/lib/goalColors';
import { ROUTES } from '@/lib/routes';

import EmptyTodo from './EmptyTodo';
import GoalCardContent from './GoalCardContent';
import NoGoalsGuide from './NoGoalsGuide';

export default function GoalListDashboardCard({ goal }: { goal: GoalSummary | null }) {
  const router = useRouter();
  const [todos, setTodos] = useState<TodoSummary[]>(goal?.todos ?? []);
  const [pendingIds, setPendingIds] = useState<number[]>([]);

  useEffect(() => {
    if (goal) setTodos(goal.todos);
  }, [goal]);

  const deadline: Date | null = (() => {
    if (!goal?.deadlineDate) return null;
    const d = new Date(String(goal.deadlineDate));
    return Number.isNaN(d.getTime()) ? null : d;
  })();

  const ddayText = (() => {
    if (!deadline) return 'D-Day';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `D-${diffDays}`;
    if (diffDays === 0) return 'D-Day';
    return `D+${Math.abs(diffDays)}`;
  })();

  const handleToggle = async (id: number) => {
    const target = todos.find(t => t.id === id);
    if (!target || pendingIds.includes(id)) return;

    const nextDone = !target.isDone;

    setTodos(prev => prev.map(t => (t.id === id ? { ...t, isDone: nextDone } : t)));
    setPendingIds(prev => [...prev, id]);

    try {
      await todosApi.toggleTodoDone(id, nextDone);
    } catch {
      // 실패 시 롤백
      setTodos(prev => prev.map(t => (t.id === id ? { ...t, isDone: !nextDone } : t)));
    } finally {
      setPendingIds(prev => prev.filter(x => x !== id));
    }
  };

  if (!goal) return <NoGoalsGuide />;

  if (todos.length === 0) {
    return (
      <div
        className="rounded-20 relative flex h-340 w-303 cursor-pointer flex-col overflow-hidden bg-white md:w-596 lg:w-480"
        onClick={() => router.push(ROUTES.GOALS.DETAIL(String(goal.goalId)))}
      >
        <div className="flex flex-1 flex-col justify-between px-32 pt-20 pb-20">
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-8">
              <GoalIcon
                className={getGoalTextColorClass(goal.color)}
                width={24}
                height={24}
                fill="currentColor"
              />
              <h3 className="text-text-01 text-body-sb-20 max-w-296 truncate">{goal.title}</h3>
            </div>

            <div className="flex items-baseline gap-12">
              <h3 className="text-text-01 text-body-sb-20">{ddayText}</h3>
              <span className="text-body-m-16 text-text-03">
                {deadline
                  ? `(${deadline.getMonth() + 1}/${deadline.getDate()} 마감)`
                  : '(마감일 미정)'}
              </span>
            </div>
          </div>

          <EmptyTodo goal={goal} />
        </div>
      </div>
    );
  }

  return <GoalCardContent goal={goal} todos={todos} onToggle={handleToggle} />;
}
