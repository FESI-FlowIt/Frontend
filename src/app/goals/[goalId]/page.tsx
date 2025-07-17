'use client';

import React, { use } from 'react';

import TodoItem from '@/components/todos/TodoItem';
import TodoModal from '@/components/todos/TodoModal';
import { useGoal } from '@/hooks/useGoals';
import { useTodos } from '@/hooks/useTodos';
import { useModalStore } from '@/store/modalStore';

interface GoalDetailPageProps {
  params: Promise<{
    goalId: string;
  }>;
}

const GoalDetailPage = ({ params }: GoalDetailPageProps) => {
  const { goalId } = use(params);
  const { data: goal, isLoading: goalLoading } = useGoal(goalId);
  const { data: todosData, isLoading: todosLoading } = useTodos(goalId);
  const openTodoModal = useModalStore(state => state.openTodoModal);

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
    <div className="bg-ui-background min-h-screen">
      <div className="container mx-auto px-16 py-32">
        {/* 목표 헤더 */}
        <div className="mb-32 rounded-xl bg-white p-24 shadow-sm">
          <div className="mb-16 flex items-center gap-16">
            <div
              className="h-24 w-24 rounded-full"
              style={{ backgroundColor: `var(${goal.color})` }}
            />
            <h1 className="text-display-32 text-text-01 font-bold">{goal.title}</h1>
            {goal.isPinned && (
              <span className="bg-secondary-01 text-text-01 text-body-12 rounded-full px-12 py-4">
                고정됨
              </span>
            )}
          </div>

          <div className="text-body-m-16 text-text-03 flex items-center gap-24">
            <span>마감일: {new Date(goal.dueDate).toLocaleDateString('ko-KR')}</span>
            <span>생성일: {new Date(goal.createdAt).toLocaleDateString('ko-KR')}</span>
          </div>

          <div className="mt-16">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-body-m-16 text-text-03">진행률</span>
              <span className="text-body-b-16 text-text-01">{goal.progress}%</span>
            </div>
            <div className="bg-line h-8 w-full rounded-full">
              <div
                className="bg-primary-01 h-8 rounded-full transition-all duration-300"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 할일 섹션 */}
        <div className="rounded-xl bg-white p-24 shadow-sm">
          <div className="mb-24 flex items-center justify-between">
            <h2 className="text-display-24 text-text-01 font-bold">
              할 일 목록 ({todosData?.totalCount || 0}개)
            </h2>
            <button
              onClick={openTodoModal}
              className="bg-primary-01 text-text-00 hover:bg-primary-01-hover rounded-lg px-16 py-8 transition-colors"
            >
              할 일 추가
            </button>
          </div>

          {/* 할일 목록 */}
          {todosLoading ? (
            <div className="py-32 text-center">
              <div className="text-text-04">할 일을 불러오는 중...</div>
            </div>
          ) : todosData?.todos && todosData.todos.length > 0 ? (
            <div className="space-y-12">
              {todosData.todos.map(todo => (
                <TodoItem key={todo.todoId} todo={todo} />
              ))}
            </div>
          ) : (
            <div className="py-48 text-center">
              <div className="text-text-04 mb-16">등록된 할 일이 없습니다.</div>
              <button
                onClick={openTodoModal}
                className="bg-primary-01 text-text-00 hover:bg-primary-01-hover rounded-lg px-24 py-12 transition-colors"
              >
                첫 번째 할 일 추가하기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 할일 추가 모달 */}
      <TodoModal defaultGoalId={goalId} />
    </div>
  );
};

export default GoalDetailPage;
