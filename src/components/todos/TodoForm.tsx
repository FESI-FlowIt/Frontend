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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
  );
};

export default TodoForm;
