'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import GoalsIcon from '@/assets/icons/GoalsIcon.svg';
import { Button } from '@/components/ui/Button';
import { GoalColor, GoalSummary, Todo } from '@/interfaces/dashboardgoalInterface';
import CheckIcon from '@/assets/icons/check.svg';
import CheckDefaultIcon from '@/assets/icons/check_default.svg';
import { ROUTES } from '@/lib/routes';

export const goalColorVariants: Record<GoalColor, { background: string; text: string }> = {
  red: { background: 'bg-[var(--color-goal-red)]', text: 'text-[var(--color-goal-red)]' },
  orange: { background: 'bg-[var(--color-goal-orange)]', text: 'text-[var(--color-goal-orange)]' },
  yellow: { background: 'bg-[var(--color-goal-yellow)]', text: 'text-[var(--color-goal-yellow)]' },
  green: { background: 'bg-[var(--color-goal-green)]', text: 'text-[var(--color-goal-green)]' },
  blue: { background: 'bg-[var(--color-goal-blue)]', text: 'text-[var(--color-goal-blue)]' },
  purple: { background: 'bg-[var(--color-goal-purple)]', text: 'text-[var(--color-goal-purple)]' },
  pink: { background: 'bg-[var(--color-goal-pink)]', text: 'text-[var(--color-goal-pink)]' },
};

export default function GoalListDashboardCard({ goal }: { goal: GoalSummary | null }) {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>(goal?.todos ?? []);

  useEffect(() => {
    if (goal) setTodos(goal.todos);
  }, [goal]);

  const handleToggle = (id: string) => {
    setTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  if (!goal) {
    return (
      <div className="relative flex h-340 w-480 flex-col items-center justify-center rounded-[20px] bg-white p-32 text-center shadow">
        <p className="text-text-03 mb-8 text-[16px] leading-[24px]">
          목표가 없습니다.
          <br />
          목표를 만들어볼까요?
        </p>
        <Button
          size="check"
          variant="snackbar"
          text="default"
          type="button"
          onClick={() => router.push('/goals/create')}
        >
          + 목표 만들기
        </Button>
      </div>
    );
  }

  const doneCount = todos.filter(todo => todo.isDone).length;
  const totalCount = todos.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  const { background: bgClass, text: textClass } = goalColorVariants[goal.color as GoalColor];

  const handleClick = () => {
    router.push(ROUTES.GOALS.goalDetail(goal.goalId));
  };

  return (
    <div
      className="relative flex h-340 w-480 cursor-pointer flex-col overflow-hidden rounded-[20px] bg-white"
      onClick={handleClick}
    >
      <div className={`absolute top-0 left-0 h-full w-12 ${bgClass}`} />
      <div className="flex flex-1 flex-col justify-between px-32 pt-20 pb-20">
        <div className="flex-col gap-20">
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-8">
              <GoalsIcon className={`h-24 w-24 ${textClass}`} />
              <h3 className="text-text-01 text-body-sb-20 max-w-296 truncate">{goal.title}</h3>
            </div>
            <div className="flex items-baseline gap-12">
              <h3 className="text-text-01 text-body-sb-20">D-{goal.dDay}</h3>
              <span className="text-body-m-16 text-text-03">({goal.deadlineDate} 마감)</span>
            </div>
            <span className="text-body-m-16 text-text-04">
              {doneCount}/{totalCount} 완료 ({progressPercent}%)
            </span>
            <div className="bg-line h-8 w-full overflow-hidden rounded-full">
              <div
                className={`h-full rounded-full ${bgClass}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-20">
          <div className="flex items-center justify-between">
            <span className="text-body-sb-20 text-text-01">할 일: {totalCount}개</span>
            <Button
              size="todoCard"
              variant="snackbar"
              text="todoCard"
              type="button"
              onClick={e => {
                e.stopPropagation();
                router.push(`/goals/${goal.goalId}/todos/create`);
              }}
            >
              + 할 일
            </Button>
          </div>

          <div className="overflow-y-auto" style={{ maxHeight: '104px' }}>
            <div className="flex flex-col gap-16">
              {[...todos]
                .sort((a, b) => Number(a.isDone) - Number(b.isDone))
                .map(todo => (
                  <div key={todo.id} className="flex h-24 items-center gap-8">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleToggle(todo.id);
                      }}
                      className="flex h-24 w-24 items-center justify-center"
                    >
                      {todo.isDone ? (
                        <CheckIcon className="h-24 w-24" />
                      ) : (
                        <CheckDefaultIcon className="h-24 w-24" />
                      )}
                    </button>

                    <span className="text-text-02 text-body-m-16">{todo.content}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
