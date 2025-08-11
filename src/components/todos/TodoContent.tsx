'use client';

import React from 'react';

import clsx from 'clsx';

import { IconButton } from '@/components/ui/IconButton';
import { useToggleTodo } from '@/hooks/useTodos';
import { Todo } from '@/interfaces/todo';

interface TodoContentProps {
  todo: Todo;
}

const TodoContent = ({ todo }: TodoContentProps) => {
  const toggleTodoMutation = useToggleTodo();

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

  return (
    <>
      {/* 체크박스 */}
      <IconButton
        variant={todo.isDone ? 'checkboxChecked' : 'checkboxUnchecked'}
        onClick={handleToggle}
        disabled={toggleTodoMutation.isPending}
        aria-label={todo.isDone ? '완료됨' : '미완료'}
        className="h-24 w-24"
      />

      {/* 제목 */}
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
    </>
  );
};

export default TodoContent;
