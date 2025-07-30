'use client';

import Image from 'next/image';

import GoalIcon from '@/../public/assets/icons/goalIcon.svg';
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
    <div className="h-screen overflow-hidden">
      <div className="container mx-auto flex h-full w-full flex-col">
        {/* 목표 정보 헤더 */}
        <div className="mb-24 flex items-center gap-8">
          <GoalIcon className="text-Gray_01 h-24 w-24" />
          <div className="text-body-sb-20 text-text-01 font-semibold">목표</div>
        </div>
        <GoalDetailHeader
          goal={goal}
          todosCount={goal.todos ? goal.todos.length : 0}
          completedCount={goal.todos ? goal.todos.filter(todo => todo.isDone).length : 0}
        />

        {/* 할일 섹션 */}
        <div className="grid flex-1 grid-cols-1 gap-24 overflow-hidden md:grid-cols-2">
          {/* To do 섹션 */}
          <div className="flex h-full flex-col overflow-hidden">
            <div className="mb-24 flex items-center gap-8">
              <TodoIcon className="text-snackbar" width={24} height={24} fill="currentColor" />
              <div className="text-body-sb-20 text-text-01 font-semibold">To do</div>
            </div>
            <div className="flex-1 overflow-hidden">
              <TodoSection todos={goal.todos || []} isLoading={false} goalId={goal.goalId} />
            </div>
          </div>

          {/* Done 섹션 */}
          <div className="flex h-full flex-col overflow-hidden">
            <div className="mb-24 flex items-center gap-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-full">
                <Image
                  src="/assets/icons/doneCheck.svg"
                  alt="Dashboard Goal Icon"
                  width={16}
                  height={16}
                />
              </div>
              <div className="text-body-sb-20 text-text-01 font-semibold">Done</div>
            </div>
            <div className="flex-1 overflow-hidden">
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
