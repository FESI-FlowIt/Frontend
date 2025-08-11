'use client';

import React, { useRef, useState } from 'react';

import clsx from 'clsx';

import DropdownMenu from '@/components/ui/DropdownMenu';
import { IconButton } from '@/components/ui/IconButton';
import { Todo } from '@/interfaces/todo';
import { createTodoItemIcons, IconConfig } from '@/lib/todoItemIcons';

interface TodoAttachmentIconsProps {
  todo: Todo;
  onNoteClick: () => void;
}

const TodoAttachmentIcons = ({ todo, onNoteClick }: TodoAttachmentIconsProps) => {
  const [showFileDropdown, setShowFileDropdown] = useState(false);
  const fileDropdownRef = useRef<HTMLDivElement>(null);

  // 파일 다운로드 핸들러
  const handleFileDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // 정리
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // 다운로드 후 드롭다운 닫기
      setShowFileDropdown(false);
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error);
      // 오류 발생 시 기본 다운로드 시도
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 다운로드 후 드롭다운 닫기
      setShowFileDropdown(false);
    }
  };

  const handleFileClick = () => {
    setShowFileDropdown(!showFileDropdown);
  };

  const handleLinkClick = () => {
    const linkAttachment = todo.attachment?.find(att => att.type === 'link');
    if (linkAttachment?.url) {
      window.open(linkAttachment.url, '_blank');
    }
  };

  // 아이콘 설정 생성
  const iconConfigs = createTodoItemIcons(todo, {
    handleFileClick,
    handleLinkClick,
    handleNoteClick: onNoteClick,
  });

  return (
    <div className="flex items-center gap-12">
      {iconConfigs.map(
        ({ condition, icon, bgColor, onClick }: IconConfig, index: number) =>
          condition && (
            <div key={index} className="relative">
              <div
                ref={index === 0 ? fileDropdownRef : undefined}
                className={`${bgColor} flex h-24 w-24 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-80`}
                onClick={onClick}
              >
                {icon}
              </div>

              {/* 파일 드롭다운 */}
              {index === 0 && (
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
                    {todo.attachment
                      ?.filter(att => att.type === 'file')
                      .map((file, fileIndex, array) => (
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
                            handleFileDownload(file.url, file.fileName || 'download');
                          }}
                        >
                          <div className="flex-1 flex-col justify-between">
                            <div className="text-body-m-20 text-text-02">{file.fileName}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </DropdownMenu>
              )}
            </div>
          ),
      )}
    </div>
  );
};

export default TodoAttachmentIcons;
