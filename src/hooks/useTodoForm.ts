import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { todosApi } from '@/api/todosApi';
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
  }>({
    form: { title: '', goalId: defaultGoalId || 0 },
    attachments: [],
  });

  const {
    attachments,
    uploadedFiles,
    setAttachments,
    reset: resetAttachments,
  } = useAttachmentStore();

  const queryClient = useQueryClient();
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
          onSuccess: async createdTodo => {
            try {
              // 2. 첨부파일이 있으면 처리
              const promises = [];

              // 링크 첨부
              const linkAttachments = attachments.filter(att => att.type === 'link');
              if (linkAttachments.length > 0) {
                const linkPromises = linkAttachments.map(async attachment => {
                  const result = await todosApi.addLinkToTodo(createdTodo.todoId, attachment.url);
                  return result;
                });
                promises.push(...linkPromises);
              }

              // 파일 첨부
              if (uploadedFiles.length > 0) {
                const filePromises = uploadedFiles.map(file =>
                  todosApi.addFileToTodo(createdTodo.todoId, file),
                );
                promises.push(...filePromises);
              }

              // 모든 첨부파일 처리 완료까지 대기
              if (promises.length > 0) {
                await Promise.all(promises);
              }

              // 첨부파일 추가 완료 후 잠시 대기 후 데이터 다시 불러오기
              setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ['goals'] });
                queryClient.invalidateQueries({ queryKey: ['todos'] });
                // 목표의 노트와 첨부파일 데이터도 무효화
                queryClient.invalidateQueries({
                  queryKey: ['goals', data.goalId, 'notes', 'attachments'],
                });
              }, 500); // 500ms 후 쿼리 무효화

              closeTodoModal();
            } catch (error) {
              console.error('첨부파일 처리 중 오류:', error);
              // 할 일은 생성되었지만 첨부파일 처리 실패
              closeTodoModal();
            }
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
