import React from 'react';

import GoalsClientContent from '@/components/goals/goalList/GoalsClientContent';
import GoalModal from '@/components/goals/GoalModal';
import TodoModal from '@/components/todos/TodoModal';

const GoalsPage = () => {
  return (
    <>
      <GoalsClientContent />
      <GoalModal />
      <TodoModal />
    </>
  );
};

export default GoalsPage;
