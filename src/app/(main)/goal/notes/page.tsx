'use client';

import React, { useState } from 'react';

import { useNoteSidebar } from '@/app/providers/NoteSidebarProvider';
import NotesClient from '@/components/notes/NotesClient';
import NoteSidebar from '@/components/ui/NoteSidebar/NoteSidebar';
import { TodoWithNotes } from '@/interfaces/todo';
import { cn } from '@/lib/utils';

interface NotesPageProps {
  searchParams: Promise<{
    goalId?: string;
  }>;
}

const NotesPage = ({ searchParams }: NotesPageProps) => {
  const params = React.use(searchParams);
  const goalId = params.goalId ? Number(params.goalId) : undefined;

  const { setIsNoteSidebarOpen } = useNoteSidebar(); // 사이드바 열림 여부
  const [selectedTodo, setSelectedTodo] = useState<TodoWithNotes | null>(null);

  const handleTodoClick = (todo: TodoWithNotes) => {
    setSelectedTodo(todo);
    setIsNoteSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsNoteSidebarOpen(false);
    setSelectedTodo(null);
  };

  return (
    <>
      <div className={cn('h-full w-full sm:mt-54 md:mt-0 lg:mt-0')}>
        <NotesClient initialGoalId={goalId} onTodoClick={handleTodoClick} />
      </div>

      {/* 데스크탑 사이드바 */}
      {selectedTodo && (
        <div className="hidden lg:block">
          <NoteSidebar
            isOpen={true}
            todo={selectedTodo}
            goalTitle={selectedTodo.goalTitle || '목표 없음'}
            onClose={handleCloseSidebar}
            isDesktop={true}
          />
        </div>
      )}

      {/* 모바일/태블릿 사이드바 */}
      {selectedTodo && (
        <div className="lg:hidden">
          <NoteSidebar
            isOpen={true}
            todo={selectedTodo}
            goalTitle={selectedTodo.goalTitle || '목표 없음'}
            onClose={handleCloseSidebar}
            isDesktop={false}
          />
        </div>
      )}
    </>
  );
};

export default NotesPage;
