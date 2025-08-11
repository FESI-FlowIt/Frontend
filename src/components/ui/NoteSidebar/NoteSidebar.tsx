import { useState } from 'react';

import { TodoWithNotes } from '@/interfaces/todo';

import NoteDetailSidebar from './NoteDetailSidebar';
import NoteListSidebar from './NoteListSidebar';

interface NoteSidebarProps {
  isOpen: boolean;
  todo?: TodoWithNotes;
  goalTitle?: string;
  onClose: () => void;
}

const NoteSidebar = ({ isOpen, todo, goalTitle, onClose }: NoteSidebarProps) => {
  const [currentView, setCurrentView] = useState<'note-list' | 'note-detail'>('note-list');
  const [setselectedNoteId, setsetselectedNoteId] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleNoteClick = (noteId: number) => {
    setCurrentView('note-detail');
    setsetselectedNoteId(noteId);
  };

  const handleBack = () => {
    setCurrentView('note-list');
  };

  const handleClose = () => {
    setCurrentView('note-list');
    onClose();
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 z-40 bg-black/50" onClick={handleClose} />

      {/* 사이드바 */}
      <div
        className={`fixed top-0 right-0 z-50 h-full bg-white shadow-lg transition-transform duration-300 ${
          currentView === 'note-list'
            ? 'w-full sm:w-336 md:w-336 lg:w-400' // 노트 목록: 좁은 너비
            : 'w-full sm:w-full md:w-512 lg:w-800' // 노트 상세: 넓은 너비
        }`}
      >
        {currentView === 'note-list' && todo && (
          <NoteListSidebar todo={todo} onClose={handleClose} onNoteClick={handleNoteClick} />
        )}
        {currentView === 'note-detail' && setselectedNoteId && (
          <NoteDetailSidebar
            noteId={setselectedNoteId}
            onClose={handleClose}
            onBack={handleBack}
            goalTitle={goalTitle}
            todoTitle={todo?.title}
          />
        )}
      </div>
    </>
  );
};

export default NoteSidebar;
