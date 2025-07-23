'use client';

import { useRouter } from 'next/navigation';

import CheckIcon from '@/../public/assets/icons/check.svg';
import CheckDefaultIcon from '@/../public/assets/icons/check_default.svg';
import GoalIcon from '@/../public/assets/icons/goalIcon.svg';
import { Button } from '@/components/ui/Button';
import { GoalColor, GoalSummary, Todo } from '@/interfaces/dashboardgoalInterface';
import { ROUTES } from '@/lib/routes';

export const goalColorVariants: Record<GoalColor, { background: string; text: string }> = {
  red: { background: 'bg-goal-red', text: 'text-goal-red' },
  orange: { background: 'bg-goal-orange', text: 'text-goal-orange' },
  yellow: { background: 'bg-goal-yellow', text: 'text-goal-yellow' },
  green: { background: 'bg-goal-green', text: 'text-goal-green' },
  blue: { background: 'bg-goal-blue', text: 'text-goal-blue' },
  purple: { background: 'bg-goal-purple', text: 'text-goal-purple' },
  pink: { background: 'bg-goal-pink', text: 'text-goal-pink' },
};

export default function GoalCardContent({
  goal,
  todos,
  onToggle,
}: {
  goal: GoalSummary;
  todos: Todo[];
  onToggle: (id: string) => void;
}) {
  const router = useRouter();

  const doneCount = todos.filter(todo => todo.isDone).length;
  const totalCount = todos.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);
  const { background: bgClass, text: textClass } = goalColorVariants[goal.color as GoalColor];

  return (
    <div
      className="relative flex h-340 w-480 cursor-pointer flex-col overflow-hidden rounded-[20px] bg-white"
      onClick={() => router.push(ROUTES.GOALS.DETAIL(goal.goalId))}
    >
      <div className={`absolute top-0 left-0 h-full w-12 ${bgClass}`} />
      <div className="flex flex-col gap-20 px-32 pt-20 pb-20">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-8">
              <GoalIcon className={`h-24 w-24 ${textClass}`} />
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
              variant="gray"
              text="todoCard"
              type="button"
              disabled={false}
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
              {todos.map(todo => (
                <div
                  key={todo.id}
                  className={`flex h-24 items-center gap-8 ${todo.isDone ? 'hidden' : ''}`}
                >
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onToggle(todo.id);
                    }}
                    className="flex h-24 w-24 items-center justify-center rounded transition hover:bg-gray-100"
                  >
                    <CheckDefaultIcon className="h-24 w-24" />
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
