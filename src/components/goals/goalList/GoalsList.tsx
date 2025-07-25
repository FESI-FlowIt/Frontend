import React from 'react';

import { GoalSummary } from '@/interfaces/goal';

import GoalCard from './GoalCard';

interface GoalsListProps {
  goals: GoalSummary[];
}

const GoalsList = ({ goals }: GoalsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-32 md:grid-cols-2 lg:w-1504 lg:grid-cols-3">
      {goals.map(goal => (
        <GoalCard key={goal.goalId} goal={goal} />
      ))}
    </div>
  );
};

export default GoalsList;
