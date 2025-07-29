'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import GoalIcon from '@/../public/assets/icons/goalIcon.svg';
import { Button } from '@/components/ui/Button';
import { GoalSummary } from '@/interfaces/goal';
import { TodoSummary } from '@/interfaces/todo';
import { getGoalColorClass } from '@/lib/goalColorUtils';
import { getGoalTextColorClass } from '@/lib/goalColorUtils';
import { ROUTES } from '@/lib/routes';
import { useModalStore } from '@/store/modalStore';

export default function GoalCardContent({
  goal,
  todos,
  onToggle,
}: {
  goal: GoalSummary;
  todos: TodoSummary[];
  // eslint-disable-next-line no-unused-vars
  onToggle: (id: number) => void;
}) {
  const router = useRouter();

  const doneCount = todos.filter(todo => todo.isDone).length;
  const totalCount = todos.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);
  const bgClass = getGoalColorClass(goal.color);
  const { openTodoModalWithGoal } = useModalStore();
  const handleCreateTodo = () => {
    openTodoModalWithGoal(goal.goalId);
  };
  return (
    <div
      className="rounded-20 relative flex h-340 w-303 cursor-pointer flex-col overflow-hidden bg-white md:w-596 lg:w-480"
      onClick={() => router.push(ROUTES.GOALS.DETAIL(String(goal.goalId)))}
    >
      <div className={`absolute top-0 left-0 h-full w-12 ${bgClass}`} />
      <div className="flex flex-col gap-20 px-32 pt-20 pb-20">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-8">
              <GoalIcon className={`h-24 w-24 ${getGoalTextColorClass(goal.color)}`} />
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
                openTodoModalWithGoal(goal.goalId);
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
                    <Image
                      src="assets/icons/check_default.svg"
                      alt="Checked Icon"
                      width={24}
                      height={24}
                    />
                  </button>
                  <span className="text-text-02 text-body-m-16">{todo.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
