import { useState } from 'react';

import { TodoWithNotes } from '@/interfaces/todo';

import NoteDetailSidebar from './NoteDetailSidebar';
import NoteListSidebar from './NoteListSidebar';

interface NoteSidebarProps {
  isOpen: boolean;
  todo?: TodoWithNotes;
  goalTitle?: string;
  onClose: () => void;
  isDesktop: boolean;
}

// 2단계 레이어 구조: NoteListSidebar → NoteDetailSidebar
const NoteSidebar = ({ isOpen, todo, goalTitle, onClose, isDesktop }: NoteSidebarProps) => {
  const [currentView, setCurrentView] = useState<'note-list' | 'note-detail'>('note-list');
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleNoteClick = (noteId: number) => {
    setCurrentView('note-detail');
    setSelectedNoteId(noteId);
  };

  const handleBack = () => {
    setCurrentView('note-list');
    setSelectedNoteId(null);
  };

  const handleClose = () => {
    setCurrentView('note-list');
    setSelectedNoteId(null);
    onClose();
  };

  return (
    <>
      {/* ===== 첫 번째 레이어: NoteListSidebar ===== */}
      {currentView === 'note-list' && (
        <>
          {/* 데스크탑: fixed 우측 */}
          {isDesktop && (
            <div className="fixed top-0 right-0 z-40 h-full w-336 overflow-y-auto border-l border-gray-200 bg-white shadow-lg">
              {todo && (
                <NoteListSidebar todo={todo} onClose={handleClose} onNoteClick={handleNoteClick} />
              )}
            </div>
          )}

          {/* 모바일/태블릿: fixed 우측 + 오버레이 */}
          {!isDesktop && (
            <>
              <div className="fixed inset-0 z-40 bg-black/50" onClick={handleClose} />
              <div className="fixed top-0 right-0 z-50 h-full w-full bg-white shadow-lg sm:w-336">
                {todo && (
                  <NoteListSidebar
                    todo={todo}
                    onClose={handleClose}
                    onNoteClick={handleNoteClick}
                  />
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* ===== 두 번째 레이어: NoteDetailSidebar (모달) ===== */}
      {currentView === 'note-detail' && selectedNoteId && (
        <>
          {/* 배경 오버레이 - NoteListSidebar 위를 어둡게 */}
          <div className="fixed inset-0 z-50 bg-black/50" onClick={handleBack} />

          {/* NoteDetailSidebar 모달 */}
          <div className="fixed top-0 right-0 z-60 h-full w-full overflow-y-auto bg-white shadow-lg sm:w-full md:w-512 lg:w-800">
            {todo && (
              <NoteDetailSidebar
                noteId={selectedNoteId}
                todoId={todo.todoId}
                onClose={handleClose}
                onBack={handleBack}
                goalTitle={goalTitle}
                todoTitle={todo?.name}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default NoteSidebar;
