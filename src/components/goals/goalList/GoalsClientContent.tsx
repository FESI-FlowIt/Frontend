'use client';

import React, { useState } from 'react';

import { useGoals } from '@/hooks/useGoals';
import { GetGoalsRequestParams } from '@/interfaces/goal';

import GoalsFilterControls from './GoalsFilterControls';
import GoalsHeader from './GoalsHeader';
import GoalsList from './GoalsList';
import GoalsPagination from './GoalsPagination';

const GoalsClientContent = () => {
  // 초기 파라미터 상수
  const INITIAL_PARAMS: GetGoalsRequestParams = {
    page: 1,
    limit: 6,
    sortBy: 'latest',
    isPinned: undefined,
  };

  // 페이지네이션, 필터링, 정렬 상태
  const [params, setParams] = useState<GetGoalsRequestParams>(INITIAL_PARAMS);

  const { data: goalsData, isLoading, error } = useGoals(params);

  // 로딩 상태 컴포넌트
  const LoadingState = () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-body-m-16 text-text-02">로딩 중...</div>
    </div>
  );

  // 에러 상태 컴포넌트
  const ErrorState = ({ message }: { message: string }) => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-body-m-16 text-error">오류가 발생했습니다: {message}</div>
    </div>
  );

  // 페이지네이션 핸들러
  const handlePageChange = (newPage: number) => {
    setParams(prev => ({ ...prev, page: newPage }));
  };

  // 정렬 변경 핸들러
  const handleSortChange = (sortBy: 'latest' | 'dueDate') => {
    setParams(prev => ({ ...prev, sortBy, page: 1 }));
  };

  // 필터 변경 핸들러
  const handleFilterChange = (isPinned?: boolean) => {
    setParams(prev => ({ ...prev, isPinned, page: 1 }));
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <div className="bg-ui-background relative min-h-screen p-24">
      <div className="mx-auto mt-52 max-w-1504 pb-118">
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
