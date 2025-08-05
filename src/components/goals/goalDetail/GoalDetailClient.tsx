'use client';

import CheckedIcon from '@/assets/icons/checkbox-checked-gray.svg';
import GoalIcon from '@/assets/icons/goal.svg';
import TodoIcon from '@/assets/icons/todo.svg';
import DoneSection from '@/components/goals/goalDetail/DoneSection';
import GoalDetailHeader from '@/components/goals/goalDetail/GoalDetailHeader';
import TodoSection from '@/components/goals/goalDetail/TodoSection';
import GoalModal from '@/components/goals/GoalModal';
import TodoModal from '@/components/todos/TodoModal';
import { useGoal } from '@/hooks/useGoals';

interface GoalDetailClientProps {
  goalId: number;
}

const GoalDetailClient = ({ goalId }: GoalDetailClientProps) => {
  const { data: goal, isLoading: goalLoading } = useGoal(goalId);
  if (goalLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-text-04">목표를 불러오는 중...</div>
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-error">목표를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden">
      <div className="container mx-auto flex h-full w-full flex-col p-6">
        {/* 목표 정보 헤더 */}
        <div className="mb-24 flex flex-shrink-0 items-center gap-8">
          <GoalIcon className="text-gray-01" width={24} height={24} fill="currentColor" />
          <div className="text-body-sb-20 text-text-01 font-semibold">목표</div>
        </div>
        <div className="mb-24 flex-shrink-0">
          <GoalDetailHeader
            goal={goal}
            todosCount={goal.todos ? goal.todos.length : 0}
            completedCount={goal.todos ? goal.todos.filter(todo => todo.isDone).length : 0}
          />
        </div>

        {/* 할일 섹션 */}
        <div className="grid h-full min-h-0 flex-1 grid-cols-1 gap-24 md:grid-cols-2">
          {/* To do 섹션 */}
          <div className="flex h-full min-h-0 flex-col">
            <div className="mb-24 flex flex-shrink-0 items-center gap-8">
              <TodoIcon className="text-gray-01" width={24} height={24} fill="currentColor" />
              <div className="text-body-sb-20 text-text-01 font-semibold">To do</div>
            </div>
            <div className="min-h-0 flex-1">
              <TodoSection todos={goal.todos || []} isLoading={false} goalId={goal.goalId} />
            </div>
          </div>

          {/* Done 섹션 */}
          <div className="flex h-full min-h-0 flex-col">
            <div className="mb-24 flex flex-shrink-0 items-center gap-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-full">
                <CheckedIcon className="checkbox-checked-gray" width={16} height={16} />
              </div>
              <div className="text-body-sb-20 text-text-01 font-semibold">Done</div>
            </div>
            <div className="min-h-0 flex-1">
              <DoneSection todos={goal.todos || []} isLoading={false} />
            </div>
          </div>
        </div>
      </div>

      <TodoModal defaultGoalId={goalId} />

      <GoalModal />
    </div>
  );
};

export default GoalDetailClient;
