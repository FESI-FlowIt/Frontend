import { useCallback, useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Goal, GoalFormData, goalFormSchema } from '@/interfaces/goal';
import { hasGoalFormChanged } from '@/lib/hasFormChanged';

interface UseGoalFormProps {
  editingGoal: Goal | null;
  // eslint-disable-next-line no-unused-vars
  onFormChange?: (hasChanges: boolean) => void;
}

export const useGoalForm = ({ editingGoal, onFormChange }: UseGoalFormProps) => {
  const isEditMode = !!editingGoal;

  const getDefaultValues = useCallback(
    (): GoalFormData => ({
      title: editingGoal?.title || '',
      color: editingGoal?.color || '',
      dueDate: editingGoal?.dueDate ? new Date(editingGoal.dueDate) : new Date(),
    }),
    [editingGoal],
  );

  const initialValues = useMemo(() => getDefaultValues(), [getDefaultValues]);

  const form = useForm<GoalFormData>({
    resolver: zodResolver(goalFormSchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
    watch,
  } = form;

  const watchedValues = watch();

  // 변경사항을 부모에게 알림
  useEffect(() => {
    const hasChanges = hasGoalFormChanged(watchedValues, initialValues);
    onFormChange?.(hasChanges);
  }, [watchedValues, initialValues, onFormChange]);

  useEffect(() => {
    reset(getDefaultValues());
  }, [editingGoal, getDefaultValues, reset]);

  return {
    form,
    control,
    handleSubmit,
    isValid,
    isEditMode,
  };
};
