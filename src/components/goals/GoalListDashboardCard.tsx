'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import CheckIcon from '@/assets/icons/check.svg';
import CheckDefaultIcon from '@/assets/icons/check_default.svg';
import GoalsIcon from '@/assets/icons/GoalsIcon.svg';
import { Button } from '@/components/ui/Button';
import { GoalColor, GoalSummary, Todo } from '@/interfaces/dashboardgoalInterface';
import { ROUTES } from '@/lib/routes';
import EmptyTodo from './EmptyTodo';
import NoGoalsGuide from './NoGoalsGuide';

export const goalColorVariants: Record<GoalColor, { background: string; text: string }> = {
  red: { background: 'bg-goal-red', text: 'text-goal-red' },
  orange: { background: 'bg-goal-orange', text: 'text-goal-orange' },
  yellow: { background: 'bg-goal-yellow', text: 'text-goal-yellow' },
  green: { background: 'bg-goal-green', text: 'text-goal-green' },
  blue: { background: 'bg-goal-blue', text: 'text-goal-blue' },
  purple: { background: 'bg-goal-purple', text: 'text-goal-purple' },
  pink: { background: 'bg-goal-pink', text: 'text-goal-pink' },
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
    return <NoGoalsGuide />;
  }

  const doneCount = todos.filter(todo => todo.isDone).length;
  const totalCount = todos.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  const { background: bgClass, text: textClass } = goalColorVariants[goal.color as GoalColor];

  const handleClick = () => {
    router.push(ROUTES.GOALS.goalDetail(goal.goalId));
  };
  if (todos.length === 0) {
    return (
      <div
        className="relative flex h-340 w-480 cursor-pointer flex-col overflow-hidden rounded-[20px] bg-white"
        onClick={handleClick}
      >
        <div className={`absolute top-0 left-0 h-full w-12 ${bgClass}`} />
        <div className="flex flex-1 flex-col justify-between px-32 pt-20 pb-20">
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-8">
              <GoalsIcon className={`h-24 w-24 ${textClass}`} />
              <h3 className="text-text-01 text-body-sb-20 max-w-296 truncate">{goal.title}</h3>
            </div>
            <div className="flex items-baseline gap-12">
              <h3 className="text-text-01 text-body-sb-20">D-{goal.dDay}</h3>
              <span className="text-body-m-16 text-text-03">({goal.deadlineDate} 마감)</span>
            </div>
          </div>

          <div className="w-full">
            <EmptyTodo goalId={goal.goalId} />
          </div>
        </div>
      </div>
    );
  }

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
            {todos.length === 0 ? (
              <EmptyTodo goalId={goal.goalId} />
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
