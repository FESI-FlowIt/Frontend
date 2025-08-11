'use client';

import React from 'react';

import TodoItem from '@/components/todos/TodoItem';
import { Todo } from '@/interfaces/todo';

interface DoneSectionProps {
  todos: Todo[];
  isLoading: boolean;
}

const DoneSection = ({ todos, isLoading }: DoneSectionProps) => {
  const completedTodos = todos.filter(todo => todo.isDone);

  if (isLoading) {
    return (
      <div className="py-32 text-center">
        <div className="text-text-04">할 일을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="rounded-20 flex flex-col bg-white p-24 sm:h-496 md:h-520 lg:h-full">
      {/* 완료 카운트 */}
      <div className="text-text-02 text-body-sb-20 mb-32">완료: {completedTodos.length}개</div>

      {/* 완료된 할 일 목록 영역 */}
      <div className="flex flex-1 flex-col overflow-hidden pb-128">
        {completedTodos.length > 0 ? (
          <div className="flex-1 space-y-20 overflow-y-auto pr-8">
            {completedTodos.map(todo => (
              <TodoItem key={todo.todoId} todo={todo} />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-body-sb-20 text-text-02 text-center">
              완료된 할 일이 <br />
              아직 없어요
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoneSection;
