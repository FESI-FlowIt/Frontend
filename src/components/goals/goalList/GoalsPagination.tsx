import React from 'react';

import { GetGoalsResponse } from '@/interfaces/goal';

import Pagination from '../../ui/Pagination';

interface GoalsPaginationProps {
  pagination: GetGoalsResponse['pagination'];
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
}

const GoalsPagination = ({ pagination, onPageChange }: GoalsPaginationProps) => {
  return (
    <div className="bg-ui-background border-line-01 fixed right-0 bottom-0 left-0 pb-36">
      <div className="mx-auto max-w-1504 px-24">
        <Pagination
          pagination={pagination}
          onPageChange={onPageChange}
          maxVisiblePages={5}
          showArrows={true}
          size="md"
        />
      </div>
    </div>
  );
};

export default GoalsPagination;
