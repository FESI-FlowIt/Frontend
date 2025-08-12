import React from 'react';

import GoalsClientContent from '@/components/goals/goalList/GoalsClientContent';
import GoalModal from '@/components/goals/GoalModal';
import TodoModal from '@/components/todos/TodoModal';
import { cn } from '@/lib/utils';

const GoalsPage = () => {
  return (
    <div className={cn('sm:mt-54 md:mt-0 lg:mt-0')}>
      <GoalsClientContent />
      <GoalModal />
      <TodoModal />
    </div>
  );
};

export default GoalsPage;
