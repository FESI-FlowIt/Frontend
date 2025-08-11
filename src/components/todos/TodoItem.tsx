'use client';

import React, { useState } from 'react';

import { Todo } from '@/interfaces/todo';

import TodoActionMenu from './TodoActionMenu';
import TodoAttachmentIcons from './TodoAttachmentIcons';
import TodoContent from './TodoContent';
import TodoModals from './TodoModals';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showNoteSidebar, setShowNoteSidebar] = useState(false);

  return (
    <div className="relative flex items-center gap-8">
      {/* 체크박스와 제목 */}
      <TodoContent todo={todo} />

      {/* 첨부파일/노트 아이콘들 */}
      <TodoAttachmentIcons todo={todo} onNoteClick={() => setShowNoteSidebar(true)} />

      {/* 액션 메뉴 */}
      <TodoActionMenu todo={todo} onDeleteClick={() => setShowDeleteConfirm(true)} />

      {/* 모달들 */}
      <TodoModals
        todo={todo}
        showDeleteConfirm={showDeleteConfirm}
        onCloseDeleteConfirm={() => setShowDeleteConfirm(false)}
        showNoteSidebar={showNoteSidebar}
        onCloseNoteSidebar={() => setShowNoteSidebar(false)}
      />
    </div>
  );
};

export default TodoItem;
