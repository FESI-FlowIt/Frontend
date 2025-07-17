'use client';

import React, { useRef, useState } from 'react';

import DropdownMenu from '@/components/ui/DropdownMenu';
import { useDeleteTodo, useToggleTodo } from '@/hooks/useTodos';
import { Todo } from '@/interfaces/todo';
import { useModalStore } from '@/store/modalStore';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const kebabButtonRef = useRef<HTMLButtonElement>(null);

  const toggleTodoMutation = useToggleTodo();
  const deleteTodoMutation = useDeleteTodo();
  const { openTodoEditModal } = useModalStore();

  const handleToggle = async () => {
    if (isToggling) return;

    setIsToggling(true);
    try {
      await toggleTodoMutation.mutateAsync({
        todoId: todo.todoId,
        isDone: !todo.isDone,
      });
    } catch (error) {
      console.error('할일 상태 변경 실패:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const handleEdit = () => {
    openTodoEditModal(todo);
    console.log(todo);
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
    <div className="bg-tertiary-01 relative flex items-center gap-12 rounded-lg p-16">
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={handleToggle}
        disabled={isToggling}
        className="text-primary-01 h-16 w-16 rounded"
      />

      <div className="flex-1">
        <h3
          className={`text-body-m-16 ${todo.isDone ? 'text-text-04 line-through' : 'text-text-01'}`}
        >
          {todo.title}
        </h3>
        <div className="mt-4 flex items-center gap-16">
          <span className="text-body-12 text-text-04">
            생성일: {new Date(todo.createdAt).toLocaleDateString('ko-KR')}
          </span>
          {todo.attachment && todo.attachment.length > 0 && (
            <span className="text-body-12 text-primary-01">📎 {todo.attachment.length}개 첨부</span>
          )}
          <span className="text-body-12 text-text-04">
            누적 시간: {Math.round(todo.accumulatedMs / 1000 / 60)}분
          </span>
        </div>
      </div>

      {/* 케밥 버튼 추후 디자인에 나오면 추가 예정 */}
      <button
        ref={kebabButtonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="rounded-lg p-8 transition-colors hover:bg-gray-100"
        aria-label="할 일 메뉴"
      >
        O
      </button>

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
            className={`flex w-full items-center gap-2 px-4 py-2 text-left transition-colors ${
              deleteTodoMutation.isPending
                ? 'cursor-not-allowed text-gray-400'
                : 'text-red-600 hover:bg-red-50'
            } `}
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
