'use client';

import { useState } from 'react';

import { MOCK_TODOS_WITH_NOTES } from '@/components/notes/constants';
import TodoWithNoteList from '@/components/notes/TodoWithNoteList';
import GoalSelector from '@/components/todos/GoalSelector';

const NotesClient = () => {
  const [selectedGoalId, setSelectedGoalId] = useState<number>(0);

  return (
    <div className="mx-auto h-full max-w-1184">
      <header className="mb-32 sm:mb-44">
        <div className="flex items-center">
          <h1 className="text-text-01 text-display-24 sm:text-display-32 font-bold">
            노트 모아보기
          </h1>
        </div>
      </header>
      <div className="flex">
        <main className="flex-1">
          <div className="mb-32">
            <GoalSelector
              selectedGoalId={selectedGoalId}
              onSelectGoal={setSelectedGoalId}
              variant="notes"
            />
          </div>
          <TodoWithNoteList todos={MOCK_TODOS_WITH_NOTES} />
        </main>
      </div>
    </div>
  );
};

export default NotesClient;
