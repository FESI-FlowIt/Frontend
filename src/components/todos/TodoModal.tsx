'use client';

import React, { useEffect, useState } from 'react';

import AddNewTodoIcon from '@/../public/assets/icons/addNewTodoIcon.svg';
import CloseIcon from '@/../public/assets/icons/closeIcon.svg';
import { useTodoForm } from '@/hooks/useTodoForm';
import { Todo } from '@/interfaces/todo';
import { useModalStore } from '@/store/modalStore';

import Modal from '../ui/Modal';

import ConfirmDialog from './ConfirmDialog';
import TodoForm from './TodoForm';

interface TodoModalProps {
  todoToEdit?: Todo;
  defaultGoalId?: number;
}

const TodoModal = ({ todoToEdit, defaultGoalId }: TodoModalProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { todoModalIsOpen, closeTodoModal, defaultGoalId: storeDefaultGoalId } = useModalStore();

  // store에서 가져온 defaultGoalId를 우선 사용하고, 없으면 props로 받은 것을 사용
  const effectiveDefaultGoalId = storeDefaultGoalId || defaultGoalId;

  // key를 통해 props가 변경될 때마다 폼을 재초기화
  const modalKey = `${todoToEdit?.todoId || 'new'}-${effectiveDefaultGoalId}`;

  const { form, hasChanges, isEditMode, handleFormSubmit, isLoading } = useTodoForm({
    todoToEdit,
    defaultGoalId: effectiveDefaultGoalId,
  });

  const handleModalClose = () => {
    if (hasChanges) {
      setShowConfirmDialog(true);
    } else {
      closeTodoModal();
    }
  };

  const handleConfirmDialogConfirm = React.useCallback(() => {
    setShowConfirmDialog(false);
    closeTodoModal();
  }, [closeTodoModal]);

  const handleConfirmDialogClose = React.useCallback(() => {
    setShowConfirmDialog(false);
  }, []);

  useEffect(() => {
    if (showConfirmDialog) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          handleConfirmDialogConfirm();
        }
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          handleConfirmDialogClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown, true);
      return () => document.removeEventListener('keydown', handleKeyDown, true);
    }
  }, [showConfirmDialog, handleConfirmDialogConfirm, handleConfirmDialogClose]);

  useEffect(() => {
    if (!todoModalIsOpen || !hasChanges) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [todoModalIsOpen, hasChanges]);

  return (
    <>
      <Modal
        key={modalKey}
        isOpen={todoModalIsOpen}
        onClose={handleModalClose}
        size="todo"
        padding="default"
        margin="default"
        rounded="default"
        layer="base"
      >
        <div className="mb-52 flex items-center justify-between">
          <h2 className="text-display-24 text-text-01 flex items-center">
            <div className="flex items-center justify-center">
              <AddNewTodoIcon className="fill-snackbar mr-12 h-24 w-24" />
            </div>
            {isEditMode ? '할 일 수정하기' : '할 일 생성'}
          </h2>
          <button
            onClick={handleModalClose}
            className="text-text-04 hover:text-text-03 h-12 w-12 cursor-pointer transition-colors"
          >
            <CloseIcon className="fill-snackbar" />
          </button>
        </div>

        <TodoForm
          form={form}
          onSubmit={handleFormSubmit}
          isEditMode={isEditMode}
          isLoading={isLoading}
        />
      </Modal>
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={handleConfirmDialogClose}
        onConfirm={handleConfirmDialogConfirm}
      />
    </>
  );
};

export default TodoModal;
