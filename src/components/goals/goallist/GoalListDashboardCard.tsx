'use client';

import { GoalSummary } from '@/interfaces/goalInterface';
import { useRouter } from 'next/navigation';
// import GoalsIcon from '@/assets/icons/GoalsIcon.svg';

export default function GoalListDashboardCard({ goal }: { goal: GoalSummary | null }) {
  const router = typeof window !== 'undefined' ? useRouter() : { push: () => {} };

  if (!goal) {
    return (
      <div className="relative flex h-[368px] w-[480px] flex-col items-center justify-center rounded-[20px] bg-white p-6 text-center shadow">
        <p className="text-text-03 mb-2 text-[16px] leading-[24px]">
          목표가 없습니다.
          <br />
          목표를 만들어볼까요?
        </p>
        <button
          className="rounded-md bg-gray-100 px-4 py-2 text-sm"
          onClick={() => router.push('/goals/create')}
        >
          + 목표 만들기
        </button>
      </div>
    );
  }

  const colorClass = `bg-[var(--color-goal-${goal.color})]` as const;
  const doneCount = goal.todos.filter(todo => todo.isDone).length;
  const totalCount = goal.todos.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  const handleClick = () => {
    router.push?.(`/goals/${goal.goalId}`);
  };

  return (
    <div
      className="relative h-[368px] w-[480px] cursor-pointer overflow-hidden rounded-[20px] bg-white"
      onClick={handleClick}
    >
      <div className={`absolute top-0 left-0 h-full w-[12px] ${colorClass}`} />

      <div className="flex h-full flex-col p-10">
        <div className="mb-2">
          <div className="flex items-center gap-2">
            {/* <GoalsIcon className="h-[24px] w-[24px]" /> */}
            <h3 className="text-text-01 text-body-sb-20">{goal.title}</h3>
          </div>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-body-sb-20">D-{goal.dDay}</span>
            <span className="text-body-m-16 text-text-03">({goal.deadlineDate} 마감)</span>
          </div>
        </div>

        {totalCount === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-text-03 mb-4 text-center text-[16px] leading-[24px]">
              목표를 이루기 위해
              <br />할 일을 생성해볼까요?
            </p>
            <button
              className="text-text-00 h-[40px] w-[140px] rounded-md bg-[var(--color-snackbar)]"
              onClick={e => {
                e.stopPropagation();
                router.push(`/goals/${goal.goalId}/todos/create`);
              }}
            >
              + 할 일 만들기
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <div className="text-body-m-16 text-text-04">
                {doneCount}/{totalCount} 완료 ({progressPercent}%)
              </div>
              <div className="bg-line relative h-[8px] w-full overflow-hidden rounded-full">
                <div
                  className={`absolute top-0 left-0 h-full rounded-full ${colorClass}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-body-sb-20 text-text-01">할 일: {totalCount}개</span>
                <button
                  className="text-body-m-16 text-text-00 h-[40px] w-[84px] rounded-md bg-[var(--color-snackbar)]"
                  onClick={e => {
                    e.stopPropagation();
                    router.push(`/goals/${goal.goalId}/todos/create`);
                  }}
                >
                  + 할 일
                </button>
              </div>

              <div className="scrollbar-thin scrollbar-track-[var(--color-line)] scrollbar-thumb-[var(--color-line)] max-h-[120px] space-y-4 overflow-y-auto">
                {[...goal.todos]
                  .sort((a, b) => Number(a.isDone) - Number(b.isDone))
                  .map(todo => (
                    <div key={todo.id} className="flex h-[24px] items-center gap-2">
                      <input
                        type="checkbox"
                        checked={todo.isDone}
                        readOnly
                        onClick={e => e.stopPropagation()}
                        className={`h-[20px] w-[20px] rounded border ${
                          todo.isDone ? 'bg-[var(--color-primary-01)]' : 'bg-white'
                        }`}
                      />
                      <span className="text-text-02 text-body-m-16">{todo.content}</span>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
