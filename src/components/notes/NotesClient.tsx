'use client';

import { useMemo, useState } from 'react';

import TodoWithNoteList from '@/components/notes/TodoWithNoteList';
import GoalSelector from '@/components/todos/GoalSelector';
import Pagination from '@/components/ui/Pagination';
import { useTodosWithNotes } from '@/hooks/useNotes';
import { TodoWithNotes } from '@/interfaces/todo';

const ITEMS_PER_PAGE = 6; // 페이지당 표시할 할 일 개수

interface NotesClientProps {
  initialGoalId?: number;
  onTodoClick: (todo: TodoWithNotes) => void;
}

const NotesClient = ({ initialGoalId, onTodoClick }: NotesClientProps) => {
  const [selectedGoalId, setSelectedGoalId] = useState<number>(initialGoalId || 0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: allTodosWithNotes = [] } = useTodosWithNotes(
    selectedGoalId === 0 ? undefined : selectedGoalId,
  );

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allTodosWithNotes.slice(startIndex, endIndex);
  }, [allTodosWithNotes, currentPage]);

  const paginationInfo = useMemo(() => {
    const totalPages = Math.ceil(allTodosWithNotes.length / ITEMS_PER_PAGE);
    return {
      currentPage,
      totalPages,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
    };
  }, [allTodosWithNotes.length, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGoalChange = (goalId: number) => {
    setSelectedGoalId(goalId);
    setCurrentPage(1);
  };

  return (
    <div className="h-full w-full">
      <header className="mb-32 sm:mb-44">
        <div className="flex items-center">
          <h1 className="text-text-01 text-display-24 sm:text-display-32 font-bold">
            노트 모아보기
          </h1>
        </div>
      </header>

      <main>
        <div className="mb-32 w-full">
          <GoalSelector
            selectedGoalId={selectedGoalId}
            onSelectGoal={handleGoalChange}
            variant="notes"
          />
        </div>
        <TodoWithNoteList todos={paginatedData} onTodoClick={onTodoClick} />

        {paginationInfo.totalPages > 1 && (
          <Pagination
            pagination={paginationInfo}
            onPageChange={handlePageChange}
            size="md"
            maxVisiblePages={5}
          />
        )}
      </main>
    </div>
  );
};

export default NotesClient;
