'use client';

import React, { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import DropdownMenu from '@/components/ui/DropdownMenu';
import { IconButton } from '@/components/ui/IconButton';
import { useDeleteTodo } from '@/hooks/useTodos';
import { Todo } from '@/interfaces/todo';
import { ROUTES } from '@/lib/routes';
import { useModalStore } from '@/store/modalStore';
import { useNoteWriteStore } from '@/store/noteWriteStore';

interface TodoActionMenuProps {
  todo: Todo;
  onDeleteClick: () => void;
}

const TodoActionMenu = ({ todo, onDeleteClick }: TodoActionMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const kebabButtonRef = useRef<HTMLButtonElement>(null);

  const deleteTodoMutation = useDeleteTodo();
  const { openTodoEditModal } = useModalStore();
  const goalTitle = useNoteWriteStore(state => state.goalTitle);
  const router = useRouter();

  const handleEdit = () => {
    openTodoEditModal(todo);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    onDeleteClick();
    setIsMenuOpen(false);
  };

  const handleWriteNote = () => {
    const searchParams = new URLSearchParams({
      todoTitle: todo.title,
      goalTitle: goalTitle || '',
    });
    router.push(`${ROUTES.TODOS.Note.WRITE(todo.todoId)}?${searchParams.toString()}`);
    setIsMenuOpen(false);
  };
  return (
    <>
      {/* 케밥 버튼 */}
      <IconButton
        ref={kebabButtonRef}
        variant="kebab"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="transition-colors hover:bg-gray-100"
        aria-label="할 일 메뉴"
      />

      {/* 드롭다운 메뉴 */}
      <DropdownMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        triggerRef={kebabButtonRef}
        position="bottom-end"
        size="full"
        className="!rounded-8 !min-w-80 border border-gray-200 shadow-lg"
      >
        <div className="">
          <button
            onClick={handleEdit}
            className="text-body-m-16 text-text-03 flex items-center px-12 py-6 text-left hover:bg-gray-50"
          >
            수정하기
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteTodoMutation.isPending}
            className={clsx(
              'text-body-m-16 text-text-03 flex items-center px-12 py-6 text-left hover:bg-gray-50',
              {
                'cursor-not-allowed opacity-50': deleteTodoMutation.isPending,
              },
            )}
          >
            {deleteTodoMutation.isPending ? '삭제 중...' : '삭제하기'}
          </button>
          <button
            onClick={handleWriteNote}
            className="text-body-m-16 text-text-03 flex items-center px-12 py-6 text-left hover:bg-gray-50"
          >
            노트 작성하기
          </button>
        </div>
      </DropdownMenu>
    </>
  );
};

export default TodoActionMenu;
