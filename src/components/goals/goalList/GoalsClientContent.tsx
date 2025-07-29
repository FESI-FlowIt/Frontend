'use client';

import React, { useState } from 'react';

import { useGoals } from '@/hooks/useGoals';
import { GetGoalsRequestParams } from '@/interfaces/goal';

import GoalsFilterControls from './GoalsFilterControls';
import GoalsHeader from './GoalsHeader';
import GoalsList from './GoalsList';
import GoalsPagination from './GoalsPagination';

const GoalsClientContent = () => {
  const INITIAL_PARAMS: GetGoalsRequestParams = {
    page: 1,
    limit: 6,
    sortBy: 'latest',
    isPinned: undefined,
  };

  const [params, setParams] = useState<GetGoalsRequestParams>(INITIAL_PARAMS);

  const { data: goalsData, isLoading, error } = useGoals(params);

  const LoadingState = () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-body-m-16 text-text-02">로딩 중...</div>
    </div>
  );

  const ErrorState = ({ message }: { message: string }) => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-body-m-16 text-error">오류가 발생했습니다: {message}</div>
    </div>
  );

  const handlePageChange = (newPage: number) => {
    setParams(prev => ({ ...prev, page: newPage }));
  };

  const handleSortChange = (sortBy: 'latest' | 'deadlineDate') => {
    setParams(prev => ({ ...prev, sortBy, page: 1 }));
  };

  const handleFilterChange = (isPinned?: boolean) => {
    setParams(prev => ({ ...prev, isPinned, page: 1 }));
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <div className="relative min-h-screen px-24">
      <div className="mx-auto max-w-1504 pb-118">
        {/* 헤더 */}
        <GoalsHeader totalCount={goalsData?.pagination?.totalCount || 0} />

        {/* 필터링 및 정렬 */}
        <GoalsFilterControls
          params={params}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />

        {/* 목표 리스트 */}
        <GoalsList goals={goalsData?.goals || []} />
      </div>

      {/* 페이지네이션 - 하단 고정 */}
      {goalsData?.pagination && (
        <GoalsPagination pagination={goalsData.pagination} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default GoalsClientContent;
