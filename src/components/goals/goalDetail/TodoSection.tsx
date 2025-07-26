'use client';

import React from 'react';

import PlusIcon from '@/../public/assets/icons/PlusIcon.svg';
import TodoItem from '@/components/todos/TodoItem';
import { Button } from '@/components/ui/Button';
import { Todo } from '@/interfaces/todo';
import { useModalStore } from '@/store/modalStore';

interface TodoSectionProps {
  todos: Todo[];
  isLoading: boolean;
}

const TodoSection = ({ todos, isLoading }: TodoSectionProps) => {
  const incompleteTodos = todos.filter(todo => !todo.isDone);
  const openTodoModal = useModalStore(state => state.openTodoModal);

  if (isLoading) {
    return (
      <div className="py-32 text-center">
        <div className="text-text-04">할 일을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="rounded-20 flex h-full flex-col bg-white p-24">
      {/* 할 일 카운트 */}
      <div className="text-text-02 text-body-sb-20 mb-32">할 일: {incompleteTodos.length}개</div>

      {/* 할 일 목록 영역 */}
      <div className="flex flex-1 flex-col overflow-hidden pb-80">
        {incompleteTodos.length > 0 ? (
          <div className="flex-1 space-y-20 overflow-y-auto pr-8">
            {incompleteTodos.map(todo => (
              <TodoItem key={todo.todoId} todo={todo} />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-body-sb-20 text-text-02 text-center">
              목표를 이루기 위해 <br />할 일을 생성해볼까요?
            </div>
          </div>
        )}
      </div>

      {/* 할 일 추가 버튼 */}
      <div className="flex justify-center">
        <Button
          onClick={openTodoModal}
          icon={<PlusIcon />}
          disabled={false}
          variant="gray"
          size="modal"
          rounded="lg"
          text="snackbar"
        >
          할 일 만들기
        </Button>
      </div>
    </div>
  );
};

export default TodoSection;
