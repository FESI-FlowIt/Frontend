'use client';

import React, { useRef, useState } from 'react';

import clsx from 'clsx';

import DropdownMenu from '@/components/ui/DropdownMenu';
import { IconButton } from '@/components/ui/IconButton';
import { useDeleteTodo, useToggleTodo } from '@/hooks/useTodos';
import { Todo } from '@/interfaces/todo';
import { useModalStore } from '@/store/modalStore';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    if (window.confirm('정말로 이 할 일을 삭제하시겠습니까?')) {
      deleteTodoMutation.mutate(todo.todoId, {
        onSuccess: () => {
          console.log('할일 삭제 성공');
        },
        onError: error => {
          console.error('할일 삭제 실패:', error);
        },
      });
    }
    setIsMenuOpen(false);
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
        size="sm"
        animation="fade"
        shadow="md"
      >
        <div className="py-1">
          <button
            onClick={handleEdit}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-900 transition-colors hover:bg-gray-50"
          >
            <span>✏️</span>
            수정하기
          </button>

          <div className="my-1 h-px bg-gray-200" />

          <button
            onClick={handleDelete}
            disabled={deleteTodoMutation.isPending}
            className={clsx(
              'flex w-full items-center gap-2 px-4 py-2 text-left transition-colors',
              {
                'cursor-not-allowed text-gray-400': deleteTodoMutation.isPending,
                'text-red-600 hover:bg-red-50': !deleteTodoMutation.isPending,
              },
            )}
          >
            <span>🗑️</span>
            {deleteTodoMutation.isPending ? '삭제 중...' : '삭제하기'}
          </button>
        </div>
      </DropdownMenu>
    </div>
  );
};

export default TodoItem;
