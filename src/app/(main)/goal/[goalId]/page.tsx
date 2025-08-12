import React from 'react';

import GoalDetailClient from '@/components/goals/goalDetail/GoalDetailClient';
import { cn } from '@/lib/utils';

interface GoalDetailPageProps {
  params: Promise<{
    goalId: number;
  }>;
}

const GoalDetailPage = async ({ params }: GoalDetailPageProps) => {
  const { goalId } = await params;

  return (
    <div className={cn('h-full sm:mt-54 md:mt-0 lg:mt-0')}>
      <GoalDetailClient goalId={goalId} />
    </div>
  );
};

export default GoalDetailPage;
