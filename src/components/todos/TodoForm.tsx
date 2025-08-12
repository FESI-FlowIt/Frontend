import React from 'react';

import { Controller, UseFormReturn } from 'react-hook-form';

import { TodoFormData } from '@/interfaces/todo';

import { Button } from '../ui/Button';
import FormField from '../ui/FormField';
import { Input } from '../ui/Input';

import AttachmentUpload from './AttachmentUpload';
import GoalSelector from './GoalSelector';

interface TodoFormProps {
  form: UseFormReturn<TodoFormData>;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: TodoFormData) => void;
  isEditMode: boolean;
  isLoading: boolean;
}

const TodoForm = ({ form, onSubmit, isEditMode, isLoading }: TodoFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="pb-96 md:pb-0">
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

      <div className="fixed right-16 bottom-0 left-16 h-80 flex-shrink-0 bg-white p-16 md:relative md:right-auto md:bottom-auto md:left-auto md:mt-60 md:h-48 md:bg-transparent md:p-0">
        <Button type="submit" disabled={!isValid || isLoading} variant="default" size="modal">
          {isLoading ? '처리 중...' : isEditMode ? '수정하기' : '생성하기'}
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
