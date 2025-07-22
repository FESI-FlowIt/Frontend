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
