import { useEffect, useRef, useState } from 'react';

import { Note } from '@/interfaces/note';
import { useNoteWriteStore } from '@/store/noteWriteStore';

import { IconButton } from '../IconButton';

import NoteDetailEditMode from './NoteDetailEditMode';
import NoteDetailReadMode from './NoteDetailReadMode';

interface NoteDetailSidebarProps {
  note: Note;
  onClose?: () => void;
  onBack: () => void;
  goalTitle?: string;
  todoTitle?: string;
}

const NoteDetailSidebar = ({ note, onBack, goalTitle, todoTitle }: NoteDetailSidebarProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 편집 모드일 때 noteWriteStore 사용
  const { setTitle, setContent, setLink, reset } = useNoteWriteStore();

  const handleKebabClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDeleteClick = () => {
    setIsDropdownOpen(false);
    handleDelete();
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleEditClick = () => {
    // 편집 모드 진입 시 스토어에 현재 노트 데이터 설정
    setTitle(note.title);
    setContent(note.content);
    setLink(note.link || '');
    setIsEditing(true);
  };

  const handleSave = () => {
    // TODO: 실제 저장 로직 구현
    console.log('Saving note');
    setIsEditing(false);
    reset(); // 스토어 초기화
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset(); // 스토어 초기화
  };

  const handleDelete = () => {
    // TODO: 실제 삭제 로직 구현
    console.log('Deleting note:', note.title);
    // 삭제 후 목록으로 돌아가기
    onBack();
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      {/* 공통 헤더 */}
      <header>
        <div className="flex-shrink-0 p-20">
          <div className="mb-12 flex items-center justify-between">
            <IconButton
              variant="back"
              onClick={onBack}
              aria-label="노트 목록으로 돌아가기"
              className="h-24 w-24"
            />
            <div className="relative" ref={dropdownRef}>
              <IconButton
                variant="kebab"
                onClick={handleKebabClick}
                aria-label="메뉴"
                className="h-24 w-24"
              />
              {isDropdownOpen && (
                <div className="absolute top-28 right-0 z-30 w-80 rounded-b-2xl bg-white shadow-md">
                  <button
                    onClick={handleDeleteClick}
                    className="text-body-m-16 text-text-03 w-full px-12 py-6"
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 컨텐츠 영역 */}
      {!isEditing ? (
        <NoteDetailReadMode
          note={note}
          onEdit={handleEditClick}
          goalTitle={goalTitle}
          todoTitle={todoTitle}
        />
      ) : (
        <NoteDetailEditMode
          note={note}
          onCancel={handleCancel}
          onSave={handleSave}
          goalTitle={goalTitle}
          todoTitle={todoTitle}
        />
      )}
    </div>
  );
};

export default NoteDetailSidebar;
