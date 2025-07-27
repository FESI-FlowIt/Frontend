'use client';

import React, { useRef, useState } from 'react';

import GoalIcon from '@/../public/assets/icons/goalIcon.svg';
import KebabIcon from '@/../public/assets/icons/kebabIcon.svg';
import { Goal } from '@/interfaces/goal';
import {
  getGoalBorderColorClass,
  getGoalColorClass,
  getGoalTextColorClass,
} from '@/lib/goalColorUtils';

import DropdownMenu from '../../ui/DropdownMenu';

interface GoalDetailHeaderProps {
  goal: Goal;
  todosCount: number;
  completedCount: number;
}

const GoalDetailHeader = ({ goal, todosCount, completedCount }: GoalDetailHeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);

  const handleEdit = () => {
    // TODO: 수정 모달 열기
    console.log('수정하기');
    setIsDropdownOpen(false);
  };

  const handleDelete = () => {
    // TODO: 삭제 확인 모달 열기
    console.log('삭제하기');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // progress 계산
  const progress = todosCount > 0 ? Math.round((completedCount / todosCount) * 100) : 0;

  return (
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
          <GoalIcon className={`h-24 w-24 rounded-full ${getGoalTextColorClass(goal.color)}`} />
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
  );
};

export default GoalDetailHeader;
