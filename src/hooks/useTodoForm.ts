import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCreateTodo, useUpdateTodo } from '@/hooks/useTodos';
import { Attachment, Todo, TodoFormData, todoFormSchema } from '@/interfaces/todo';
import { hasFormChanged } from '@/lib/hasFormChanged';
import { useAttachmentStore } from '@/store/attachmentStore';
import { useModalStore } from '@/store/modalStore';

interface UseTodoFormProps {
  todoToEdit?: Todo;
  defaultGoalId?: number;
}

export const useTodoForm = ({ todoToEdit, defaultGoalId }: UseTodoFormProps) => {
  const [initialState, setInitialState] = useState<{
    form: TodoFormData;
    attachments: Attachment[];
  } | null>(null);

  const { attachments, setAttachments, reset: resetAttachments } = useAttachmentStore();
  const { todoModalIsOpen, editingTodo, closeTodoModal } = useModalStore();

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();

  const currentTodo = editingTodo || todoToEdit;
  const isEditMode = !!currentTodo;

  const form = useForm<TodoFormData>({
    resolver: zodResolver(todoFormSchema),
    mode: 'onChange',
  });

  const { reset, watch } = form;
  const watchedValues = watch();

  const hasChanges = hasFormChanged(watchedValues, attachments, initialState);

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
          goalId: defaultGoalId || 0,
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

  const handleFormSubmit = (data: TodoFormData) => {
    if (isEditMode && currentTodo) {
      updateTodoMutation.mutate(
        {
          todoId: currentTodo.todoId,
          data: {
            name: data.title,
            goalId: data.goalId, // goalId 업데이트 추가
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
          name: data.title,
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

  return {
    form,
    hasChanges,
    isEditMode,
    currentTodo,
    handleFormSubmit,
    isLoading,
  };
};
