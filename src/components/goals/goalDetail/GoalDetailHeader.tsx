'use client';

import React, { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import KebabIcon from '@/../public/assets/icons/kebabIcon.svg';
import GoalIcon from '@/assets/icons/goal.svg';
import { useDeleteGoal } from '@/hooks/useGoals';
import { Goal } from '@/interfaces/goal';
import {
  getGoalBorderColorClass,
  getGoalColorClass,
  getGoalTextColorClass,
} from '@/lib/goalColorUtils';
import { ROUTES } from '@/lib/routes';
import { useModalStore } from '@/store/modalStore';

import ConfirmDialog from '../../todos/ConfirmDialog';
import DropdownMenu from '../../ui/DropdownMenu';
interface GoalDetailHeaderProps {
  goal: Goal;
  todosCount: number;
  completedCount: number;
}

const GoalDetailHeader = ({ goal, todosCount, completedCount }: GoalDetailHeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  const deleteGoalMutation = useDeleteGoal();
  const { openGoalEditModal } = useModalStore();

  const handleEdit = () => {
    openGoalEditModal(goal);
    setIsDropdownOpen(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
    setIsDropdownOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteGoalMutation.mutateAsync(goal.goalId);
      setShowDeleteConfirm(false);
      router.push(ROUTES.GOALS.LIST); // 목표 목록 페이지로 리다이렉트
    } catch (error) {
      console.error('목표 삭제 실패:', error);
      setShowDeleteConfirm(false);

      // 에러 메시지 표시 (실제 프로젝트에서는 toast 등을 사용)
      if (error instanceof Error) {
        alert(`목표 삭제에 실패했습니다: ${error.message}`);
      } else {
        alert('목표 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // progress 계산
  const progress = todosCount > 0 ? Math.round((completedCount / todosCount) * 100) : 0;
  return (
    <>
      <div
        className={`rounded-20 relative mb-32 h-180 w-full border-2 bg-white py-24 pr-24 pl-36 shadow-sm ${getGoalBorderColorClass(goal.color)}`}
      >
        {/* 왼쪽 색상 바 */}
        <div
          className={`absolute top-0 left-0 h-full w-12 rounded-l-full ${getGoalColorClass(goal.color)}`}
        />
        {/* 목표 헤더 */}
        <div className="mb-24 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <GoalIcon
              className={getGoalTextColorClass(goal.color)}
              width={24}
              height={24}
              fill="currentColor"
            />
            <h1 className="text-body-sb-20 text-text-01 font-bold">{goal.title}</h1>
          </div>
          <div className="relative">
            <button
              ref={dropdownTriggerRef}
              onClick={toggleDropdown}
              className="text-text-02 flex h-24 w-24 items-center justify-center rounded-full transition-colors"
              aria-label="더보기 메뉴"
            >
              <KebabIcon className="text-Gray_01 h-20 w-20" />
            </button>
            <DropdownMenu
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
              triggerRef={dropdownTriggerRef}
              position="bottom-right"
              size="full"
              className="!rounded-8 !min-w-80 border border-gray-200 shadow-lg"
            >
              <div className="">
                <button
                  onClick={handleEdit}
                  className="text-body-m-16 text-text-03 flex items-center px-12 py-6 text-left hover:bg-gray-50"
                >
                  수정하기
                </button>
                <button
                  onClick={handleDelete}
                  className="text-body-m-16 text-text-03 flex items-center px-12 py-6 text-left hover:bg-gray-50"
                >
                  삭제하기
                </button>
              </div>
            </DropdownMenu>
          </div>
        </div>

        {/* D-Day 및 마감일 정보 */}
        <div className="mb-16 flex items-center gap-6">
          <div className="text-body-sb-20 text-text-01 font-semibold">
            D-
            {Math.max(
              0,
              Math.ceil(
                (new Date(goal.deadlineDate).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24),
              ),
            )}
          </div>
          <div className="text-body-m-16 text-text-03">
            ({new Date(goal.deadlineDate).getMonth() + 1}/{new Date(goal.deadlineDate).getDate()}{' '}
            마감)
          </div>
        </div>

        {/* 진행률 */}
        <div className="mb-12 flex items-center justify-between">
          <span className="text-body-m-16 text-text-03">
            {completedCount}/{todosCount} 완료 ({progress}%)
          </span>
        </div>
        <div className="bg-line h-8 w-full rounded-full">
          <div
            className={`h-8 rounded-full transition-all duration-300 ${getGoalColorClass(goal.color)}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="목표를 삭제하실건가요?"
        message="삭제된 목표는 복구할 수 없어요"
        confirmText="확인"
        cancelText="취소"
      />
    </>
  );
};

export default GoalDetailHeader;
