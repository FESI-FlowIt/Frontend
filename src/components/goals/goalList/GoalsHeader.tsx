import React from 'react';

import GoalIcon from '@/../public/assets/icons/goalIcon.svg';

interface GoalsHeaderProps {
  totalCount: number;
}

const GoalsHeader = ({ totalCount }: GoalsHeaderProps) => {
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
      </div>
    </div>
  );
};

export default GoalsHeader;
