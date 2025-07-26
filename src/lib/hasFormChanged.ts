import { GoalFormData } from '@/interfaces/goal';
import { Attachment, TodoFormData } from '@/interfaces/todo';

export const hasFormChanged = (
  watchedValues: TodoFormData,
  attachments: Attachment[],
  initialState: {
    form: TodoFormData;
    attachments: Attachment[];
  } | null,
): boolean => {
  if (!initialState) return false;

  return (
    JSON.stringify(watchedValues) !== JSON.stringify(initialState.form) ||
    JSON.stringify(attachments) !== JSON.stringify(initialState.attachments)
  );
};

export const hasGoalFormChanged = (
  watchedValues: GoalFormData,
  initialState: GoalFormData | null,
): boolean => {
  if (!initialState) return false;

  // Date 객체는 별도로 비교
  const initialWithStringDate = {
    ...initialState,
    deadlineDate: initialState.deadlineDate.toISOString(),
  };

  const watchedWithStringDate = {
    ...watchedValues,
    deadlineDate: watchedValues.deadlineDate.toISOString(),
  };

  return JSON.stringify(watchedWithStringDate) !== JSON.stringify(initialWithStringDate);
};
