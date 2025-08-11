import React from 'react';

import FileIcon from '@/assets/icons/file.svg';
import LinkIcon from '@/assets/icons/link.svg';
import NoteIcon from '@/assets/icons/note.svg';
import { Todo } from '@/interfaces/todo';

export interface IconConfig {
  condition: boolean;
  icon: React.ReactNode;
  bgColor: string;
  onClick: () => void;
}

/**
 * TodoItem의 아이콘 설정을 생성하는 유틸리티 함수
 */
export const createTodoItemIcons = (
  todo: Todo,
  handlers: {
    handleFileClick: () => void;
    handleLinkClick: () => void;
    handleNoteClick: () => void;
  },
): IconConfig[] => [
  {
    condition: Boolean(todo.attachment?.some(att => att.type === 'file')),
    icon: <FileIcon className="text-gray-01" width={16} height={16} />,
    bgColor: 'bg-tertiary-01',
    onClick: handlers.handleFileClick,
  },
  {
    condition: Boolean(todo.attachment?.some(att => att.type === 'link')),
    icon: <LinkIcon className="text-gray-01" width={16} height={16} />,
    bgColor: 'bg-tertiary-01',
    onClick: handlers.handleLinkClick,
  },
  {
    condition: Boolean(todo.notes && todo.notes.length > 0),
    icon: <NoteIcon className="text-primary-01" width={16} height={16} />,
    bgColor: 'bg-primary-soft',
    onClick: handlers.handleNoteClick,
  },
];
