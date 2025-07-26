import React from 'react';

import GoalDetailClient from '@/components/goals/goalDetail/GoalDetailClient';

interface GoalDetailPageProps {
  params: Promise<{
    goalId: string;
  }>;
}

const GoalDetailPage = async ({ params }: GoalDetailPageProps) => {
  const { goalId } = await params;

  return (
    <div className="min-h-screen">
      <GoalDetailClient goalId={goalId} />
    </div>
  );
};

export default GoalDetailPage;
