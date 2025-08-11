import React from 'react';

import GoalDetailClient from '@/components/goals/goalDetail/GoalDetailClient';

interface GoalDetailPageProps {
  params: Promise<{
    goalId: number;
  }>;
}

const GoalDetailPage = async ({ params }: GoalDetailPageProps) => {
  const { goalId } = await params;

  return (
    <div className="h-full">
      <GoalDetailClient goalId={goalId} />
    </div>
  );
};

export default GoalDetailPage;
