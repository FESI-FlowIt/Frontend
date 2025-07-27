'use client';

import React, { useRef, useState } from 'react';

import clsx from 'clsx';

import DropdownMenu from '@/components/ui/DropdownMenu';
import { IconButton } from '@/components/ui/IconButton';
import { useDeleteTodo, useToggleTodo } from '@/hooks/useTodos';
import { Todo } from '@/interfaces/todo';
import { useModalStore } from '@/store/modalStore';

import ConfirmDialog from './ConfirmDialog';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const kebabButtonRef = useRef<HTMLButtonElement>(null);

  const toggleTodoMutation = useToggleTodo();
  const deleteTodoMutation = useDeleteTodo();
  const { openTodoEditModal } = useModalStore();

  const handleToggle = async () => {
    if (toggleTodoMutation.isPending) return;
    try {
      await toggleTodoMutation.mutateAsync({
        todoId: todo.todoId,
        isDone: !todo.isDone,
      });
    } catch (error) {
      console.error('할일 상태 변경 실패:', error);
    }
  };

  const handleEdit = () => {
    openTodoEditModal(todo);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
    setIsMenuOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTodoMutation.mutateAsync(todo.todoId);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('할일 삭제 실패:', error);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="relative flex items-center gap-8">
      {/* 체크박스 */}
      <IconButton
        variant={todo.isDone ? 'checkboxChecked' : 'checkboxUnchecked'}
        onClick={handleToggle}
        disabled={toggleTodoMutation.isPending}
        aria-label={todo.isDone ? '완료됨' : '미완료'}
        className="h-24 w-24"
      />

      <div className="flex-1">
        <h3
          className={clsx('text-body-m-20', {
            'text-primary-01-hover line-through': todo.isDone,
            'text-text-01': !todo.isDone,
          })}
        >
          {todo.title}
        </h3>
      </div>

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
        position="bottom-right"
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
        </div>
      </DropdownMenu>

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="할 일을 삭제하실건가요?"
        message="삭제된 할 일은 복구할 수 없어요"
        confirmText="확인"
        cancelText="취소"
      />
    </div>
  );
};

export default TodoItem;
