'use client';

import { useMemo, useState } from 'react';

import TodoWithNoteList from '@/components/notes/TodoWithNoteList';
import GoalSelector from '@/components/todos/GoalSelector';
import NoteSidebar from '@/components/ui/NoteSidebar/NoteSidebar';
import Pagination from '@/components/ui/Pagination';
import { useTodosWithNotes } from '@/hooks/useNotes';
import { TodoWithNotes } from '@/interfaces/todo';

const ITEMS_PER_PAGE = 6; // 페이지당 표시할 할 일 개수

interface NotesClientProps {
  initialGoalId?: number;
}

const NotesClient = ({ initialGoalId }: NotesClientProps) => {
  const [selectedGoalId, setSelectedGoalId] = useState<number>(initialGoalId || 0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoWithNotes | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: allTodosWithNotes = [] } = useTodosWithNotes(
    selectedGoalId === 0 ? undefined : selectedGoalId,
  );

  // 페이지네이션 계산
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

  const handleTodoClick = (todo: TodoWithNotes) => {
    setSelectedTodo(todo);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedTodo(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 목표 변경 시 페이지 초기화
  const handleGoalChange = (goalId: number) => {
    setSelectedGoalId(goalId);
    setCurrentPage(1);
  };

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
              onSelectGoal={handleGoalChange}
              variant="notes"
            />
          </div>
          <TodoWithNoteList todos={paginatedData} onTodoClick={handleTodoClick} />

          {/* 페이지네이션 */}
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

      {/* 할 일 클릭 시 열리는 사이드바 */}
      {isSidebarOpen && selectedTodo && (
        <NoteSidebar
          isOpen={isSidebarOpen}
          todo={selectedTodo}
          goalTitle={selectedTodo.goalTitle || '목표 없음'}
          onClose={handleCloseSidebar}
        />
      )}
    </div>
  );
};

export default NotesClient;
