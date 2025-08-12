'use client';

import React from 'react';

import NoteSidebar from '@/components/ui/NoteSidebar/NoteSidebar';
import { useDeleteTodo } from '@/hooks/useTodos';
import { Todo } from '@/interfaces/todo';
import { useNoteWriteStore } from '@/store/noteWriteStore';

import ConfirmDialog from './ConfirmDialog';

interface TodoModalsProps {
  todo: Todo;
  showDeleteConfirm: boolean;
  onCloseDeleteConfirm: () => void;
  showNoteSidebar: boolean;
  onCloseNoteSidebar: () => void;
}

const TodoModals = ({
  todo,
  showDeleteConfirm,
  onCloseDeleteConfirm,
  showNoteSidebar,
  onCloseNoteSidebar,
}: TodoModalsProps) => {
  const deleteTodoMutation = useDeleteTodo();
  const goalTitle = useNoteWriteStore(state => state.goalTitle);

  const handleConfirmDelete = async () => {
    try {
      await deleteTodoMutation.mutateAsync(todo.todoId);
      onCloseDeleteConfirm();
    } catch (error) {
      console.error('할일 삭제 실패:', error);
      onCloseDeleteConfirm();
    }
  };
  return (
    <>
      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={onCloseDeleteConfirm}
        onConfirm={handleConfirmDelete}
        title="할 일을 삭제하실건가요?"
        message="삭제된 할 일은 복구할 수 없어요"
        confirmText="확인"
        cancelText="취소"
      />

      {/* 노트 사이드바 */}
      <NoteSidebar
        isOpen={showNoteSidebar}
        todo={{
          todoId: todo.todoId,
          name: todo.title,
          isDone: todo.isDone,
          note:
            todo.notes?.map(note => ({
              noteId: note.noteId,
              todoId: note.todoId,
              title: note.title,
              updatedAt: note.updatedAt,
            })) || [],
          goalId: todo.goalId,
        }}
        goalTitle={goalTitle || undefined}
        onClose={onCloseNoteSidebar}
      />
    </>
  );
};

export default TodoModals;
