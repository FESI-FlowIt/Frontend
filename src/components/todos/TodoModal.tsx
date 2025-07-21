'use client';

import React, { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import AddNewTodoIcon from '@/assets/AddNewTodoIcon.svg';
import CloseIcon from '@/assets/CloseIcon.svg';
import { useCreateTodo, useUpdateTodo } from '@/hooks/useTodos';
import { Attachment, Todo, TodoFormData, todoFormSchema } from '@/interfaces/todo';
import { useAttachmentStore } from '@/store/attachmentStore';
import { useModalStore } from '@/store/modalStore';

import { Button } from '../ui/Button';
import FormField from '../ui/FormField';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal';

import AttachmentUpload from './AttachmentUpload';
import ConfirmDialog from './ConfirmDialog';
import GoalSelector from './GoalSelector';

interface TodoModalProps {
  todoToEdit?: Todo;
  defaultGoalId?: string;
}

const TodoModal = ({ todoToEdit, defaultGoalId }: TodoModalProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [initialState, setInitialState] = useState<{
    form: TodoFormData;
    attachments: Attachment[];
  } | null>(null);
  const { attachments, setAttachments, reset: resetAttachments } = useAttachmentStore();

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();

  const { todoModalIsOpen, closeTodoModal, editingTodo } = useModalStore();

  const currentTodo = editingTodo || todoToEdit;
  const isEditMode = !!currentTodo;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoFormSchema),
    mode: 'onChange',
  });

  const watchedValues = watch();

  const hasChanges =
    initialState &&
    (JSON.stringify(watchedValues) !== JSON.stringify(initialState.form) ||
      JSON.stringify(attachments) !== JSON.stringify(initialState.attachments));

  useEffect(() => {
    if (todoModalIsOpen) {
      if (isEditMode && currentTodo) {
        const formData = {
          title: currentTodo.title,
          goalId: currentTodo.goalId,
        };
        reset(formData);
        setAttachments(currentTodo.attachment || []);
        setInitialState({
          form: formData,
          attachments: currentTodo.attachment || [],
        });
      } else {
        const formData = {
          title: '',
          goalId: defaultGoalId || '',
        };
        reset(formData);

        resetAttachments();
        setInitialState({
          form: formData,
          attachments: [],
        });
      }
    }
  }, [
    todoModalIsOpen,
    isEditMode,
    currentTodo,
    defaultGoalId,
    reset,
    setAttachments,
    resetAttachments,
  ]);

  const handleModalClose = () => {
    if (hasChanges) {
      setShowConfirmDialog(true);
    } else {
      closeTodoModal();
    }
  };

  useEffect(() => {
    if (!todoModalIsOpen || !hasChanges) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [todoModalIsOpen, hasChanges]);

  const handleFormSubmit = (data: TodoFormData) => {
    if (isEditMode && currentTodo) {
      updateTodoMutation.mutate(
        {
          todoId: currentTodo.todoId,
          data: {
            title: data.title,
            attachments: attachments,
          },
        },
        {
          onSuccess: () => {
            closeTodoModal();
          },
          onError: () => {},
        },
      );
    } else {
      createTodoMutation.mutate(
        {
          goalId: data.goalId,
          title: data.title,
          attachments: attachments,
        },
        {
          onSuccess: () => {
            closeTodoModal();
          },
          onError: () => {},
        },
      );
    }
  };

  const isLoading = createTodoMutation.isPending || updateTodoMutation.isPending;

  return (
    <>
      <Modal
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

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div>
            <FormField label="제목" htmlFor="title" className="mb-44">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" inputSize="modal" variant="modal" />
                )}
              />
            </FormField>

            {/* 자료 업로드 */}
            <FormField label="자료" className="mb-44">
              <AttachmentUpload />
            </FormField>

            {/* 목표 선택 */}
            <FormField label="목표 선택" htmlFor="goalId">
              <Controller
                name="goalId"
                control={control}
                render={({ field }) => (
                  <GoalSelector
                    selectedGoalId={field.value}
                    onSelectGoal={field.onChange}
                    error={!!errors.goalId}
                  />
                )}
              />
            </FormField>
          </div>

          <div className="mt-60">
            <Button type="submit" disabled={!isValid || isLoading} variant="default" size="modal">
              {isLoading ? '처리 중...' : isEditMode ? '수정하기' : '생성하기'}
            </Button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={() => closeTodoModal()}
      />
    </>
  );
};

export default TodoModal;
