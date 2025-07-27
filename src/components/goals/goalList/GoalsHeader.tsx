import React from 'react';

import GoalIcon from '@/../public/assets/icons/goalIcon.svg';
import { useModalStore } from '@/store/modalStore';

interface GoalsHeaderProps {
  totalCount: number;
}

const GoalsHeader = ({ totalCount }: GoalsHeaderProps) => {
  const { openGoalModal } = useModalStore();

  return (
    <div className="mb-48">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-8">
            <GoalIcon className="h-24 w-24" />
            <h1 className="text-display-32 text-text-01">모든 목표</h1>
          </div>

          <p className="text-body-m-20 text-text-03 mt-24">
            총 {totalCount}개의 목표 달성을 위해 노력 중이에요!
          </p>
        </div>
        <button
          onClick={openGoalModal}
          className="rounded-8 bg-primary-01 text-body-b-16 text-text-00 hover:bg-primary-01-hover flex items-center gap-8 px-24 py-16 transition-colors"
        >
          <svg className="h-20 w-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          새 목표 추가
        </button>
      </div>
    </div>
  );
};

export default GoalsHeader;
