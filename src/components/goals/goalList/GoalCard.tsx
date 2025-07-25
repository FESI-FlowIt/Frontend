'use client';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import GoalIcon from '@/../public/assets/icons/goalIcon.svg';
import PinIconOff from '@/../public/assets/icons/pinIcon_off.svg';
import PinIcon from '@/../public/assets/icons/pinIcon_on.svg';
import PlusIcon from '@/assets/PlusIcon.svg';
import { useUpdateGoalPinStatus } from '@/hooks/useGoals';
import { GoalSummary } from '@/interfaces/goal';
import { TodoSummary } from '@/interfaces/todo';
import { getGoalColorClass, getGoalTextColorClass } from '@/lib/goalColorUtils';
import { ROUTES } from '@/lib/routes';
import { useModalStore } from '@/store/modalStore';

import { Button } from '../../ui/Button';

interface GoalCardProps {
  goal: GoalSummary;
}

const GoalCard = ({ goal }: GoalCardProps) => {
  const { openTodoModalWithGoal } = useModalStore();
  const updateGoalPinStatus = useUpdateGoalPinStatus();
  const router = useRouter();

  const handleCardClick = () => {
    router.push(ROUTES.GOALS.DETAIL(goal.goalId));
  };

  const handleTogglePin = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await updateGoalPinStatus.mutateAsync({
        goalId: goal.goalId,
        isPinned: !goal.isPinned,
      });
    } catch (error) {
      console.error('핀 상태 변경 실패:', error);
    }
  };

  const calculateProgress = (todos: TodoSummary[]) => {
    if (todos.length === 0) return 0;
    const completedTodos = todos.filter(todo => todo.isDone).length;
    return Math.round((completedTodos / todos.length) * 100);
  };

  const progress = calculateProgress(goal.todos);
  const completedCount = goal.todos.filter(todo => todo.isDone).length;
  const incompleteTodos = goal.todos.filter(todo => !todo.isDone);

  const handleCreateTodo = (e: React.MouseEvent) => {
    e.stopPropagation();
    openTodoModalWithGoal(goal.goalId);
  };

  const CreateTodoButton = () => (
    <Button
      size="emptytodoCard"
      variant="snackbar"
      text="snackbar"
      rounded="lg"
      icon={<PlusIcon className="text-white" />}
      disabled={false}
      onClick={handleCreateTodo}
    >
      할 일 만들기
    </Button>
  );

  return (
    <div
      className="rounded-20 relative flex h-340 w-480 cursor-pointer flex-col overflow-hidden bg-white shadow-lg"
      onClick={handleCardClick}
    >
      {/* 왼쪽 색상 바 */}
      <div className={`absolute top-0 left-0 h-full w-12 ${getGoalColorClass(goal.color)}`} />

      {/* 고정 핀 아이콘 */}
      <div className="absolute top-20 right-20 cursor-pointer" onClick={handleTogglePin}>
        {goal.isPinned ? (
          <PinIcon className="text-heatmap-accent" />
        ) : (
          <PinIconOff className="text-text-inactive" />
        )}
      </div>

      <div className="mr-20 ml-32 flex flex-col gap-20 pt-20">
        {/* 상단 정보 */}
        <div className="flex flex-col">
          {/* 목표 제목 */}
          <div className="mb-16 flex items-center gap-8">
            <GoalIcon className={getGoalTextColorClass(goal.color)} />
            <div className="text-body-sb-20 text-text-01 max-w-296 truncate">{goal.title}</div>
          </div>

          {/* D-Day 정보 */}
          <div className="flex items-baseline gap-12">
            <h3 className={`text-body-sb-20`}>D-{goal.dDay}</h3>
            <span className="text-body-m-16 text-text-03">({goal.deadlineDate} 마감)</span>
          </div>

          {/* 진행률 정보 및 진행률 바: todo가 있을 때만 표시 */}
          {goal.todos.length > 0 && (
            <>
              <span className="text-body-m-16 text-text-04 mb-8">
                {completedCount}/{goal.todos.length} 완료 ({progress}%)
              </span>
              <div className="bg-line h-8 w-full overflow-hidden rounded-full">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${getGoalColorClass(goal.color)}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          )}
        </div>

        {/* 할 일 섹션 */}
        <div className="flex flex-col">
          {incompleteTodos.length > 0 ? (
            <>
              <div className="mb-20 flex items-center justify-between py-9">
                <span className="text-body-sb-20 text-text-01">
                  할 일: {incompleteTodos.length}개
                </span>
              </div>
              <div className="mb-20 flex max-h-110 flex-col gap-16 overflow-y-auto">
                {incompleteTodos.map((todo, index) => (
                  <div key={todo.id || index} className="flex h-24 items-center gap-8">
                    <div className="flex h-24 w-24 items-center justify-center">
                      <Image
                        src="/assets/icons/check_default.svg"
                        alt="Checked Icon"
                        width={24}
                        height={24}
                      />
                    </div>
                    <span className="text-text-02 text-body-m-16 flex-1 truncate">
                      {todo.title}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : goal.todos.length > 0 ? (
            <div className="flex flex-col items-center justify-center pt-22">
              <div className="mb-32 flex items-center gap-8 text-center">
                <Image src="/assets/icons/check.svg" alt="Check Icon" width={20} height={20} />
                <div className="text-body-sb-20 text-primary-01 font-semibold">
                  모든 할 일을 완료 했어요!
                </div>
              </div>
              <CreateTodoButton />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-40">
              <div className="mb-32 flex flex-col items-center gap-8 text-center">
                <div className="text-body-sb-20 text-text-02 font-semibold">목표를 이루기 위해</div>
                <div className="text-body-sb-20 text-text-02 font-semibold">
                  할 일을 생성해볼까요?
                </div>
              </div>
              <CreateTodoButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
