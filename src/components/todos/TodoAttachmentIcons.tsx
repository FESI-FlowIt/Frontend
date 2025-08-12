'use client';

import React, { useRef, useState } from 'react';

import clsx from 'clsx';

import AttachmentIcon from '@/assets/icons/file.svg';
import LinkIcon from '@/assets/icons/link.svg';
import NoteIcon from '@/assets/icons/note.svg';
import DropdownMenu from '@/components/ui/DropdownMenu';
import { IconButton } from '@/components/ui/IconButton';
import { useToast } from '@/hooks/useToast';
import { Todo } from '@/interfaces/todo';
import { useTodoAttachmentsStore } from '@/store/todoAttachmentsStore';
interface TodoAttachmentIconsProps {
  todo: Todo;
  onNoteClick: () => void;
}

const TodoAttachmentIcons = ({ todo, onNoteClick }: TodoAttachmentIconsProps) => {
  const [showFileDropdown, setShowFileDropdown] = useState(false);
  const fileDropdownRef = useRef<HTMLDivElement>(null);

  // store에서 해당 todo의 첨부파일 정보 가져오기
  const { hasNotes, hasLinks, hasFiles, getLinks, getFiles } = useTodoAttachmentsStore();
  const toast = useToast();
  // 파일 다운로드 핸들러
  const handleFileDownload = async (fileUrl: string) => {
    try {
      // 브라우저 기본 다운로드 동작 사용
      window.open(fileUrl, '_blank');

      // 다운로드 후 드롭다운 닫기
      setShowFileDropdown(false);
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error);
      toast.error('파일 다운로드에 실패했어요.');
    }
  };

  const handleFileClick = () => {
    // 디버깅: 파일 데이터 확인
    const files = getFiles(todo.todoId);
    console.log('파일 데이터:', files);
    setShowFileDropdown(!showFileDropdown);
  };

  const handleLinkClick = () => {
    const links = getLinks(todo.todoId);
    if (links.length > 0 && links[0].url) {
      window.open(links[0].url, '_blank');
    }
  };

  return (
    <div className="flex items-center gap-12">
      {/* 파일 아이콘 */}
      {hasFiles(todo.todoId) && (
        <div className="relative">
          <div
            ref={fileDropdownRef}
            className="bg-tertiary-01 flex h-24 w-24 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-80"
            onClick={handleFileClick}
          >
            <AttachmentIcon className="text-gray-01" width={16} height={16} />
          </div>

          {/* 파일 드롭다운 */}
          <DropdownMenu
            isOpen={showFileDropdown}
            onClose={() => setShowFileDropdown(false)}
            triggerRef={fileDropdownRef}
            position="bottom-start"
            size="full"
            className="!min-w-520 border border-gray-200 shadow-lg"
          >
            <div className="">
              <div className="flex items-center justify-between px-20 py-14">
                <div className="text-body-sb-20 text-text-02">첨부파일</div>
                <IconButton
                  variant="close"
                  onClick={() => setShowFileDropdown(false)}
                  aria-label="첨부파일 닫기"
                  className="h-20 w-20"
                />
              </div>
              {getFiles(todo.todoId).map((file, fileIndex, array) => (
                <div
                  key={fileIndex}
                  className={clsx(
                    'hover:bg-tertiary-01-press flex cursor-pointer items-center px-20 py-15 hover:underline',
                    {
                      'hover:rounded-b-[20px]': fileIndex === array.length - 1,
                    },
                  )}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleFileDownload(file.url);
                  }}
                >
                  <div className="flex-1 flex-col justify-between">
                    <div className="text-body-m-20 text-text-02">
                      {file.fileName || '파일명 없음'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DropdownMenu>
        </div>
      )}

      {/* 링크 아이콘 */}
      {hasLinks(todo.todoId) && (
        <div
          className="bg-tertiary-01 flex h-24 w-24 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-80"
          onClick={handleLinkClick}
        >
          <LinkIcon className="text-gray-01" width={16} height={16} />
        </div>
      )}

      {/* 노트 아이콘 */}
      {hasNotes(todo.todoId) && (
        <div
          className="bg-primary-soft flex h-24 w-24 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-80"
          onClick={onNoteClick}
        >
          <NoteIcon className="text-primary-01" width={16} height={16} />
        </div>
      )}
    </div>
  );
};

export default TodoAttachmentIcons;
