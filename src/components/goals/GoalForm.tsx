'use client';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { useGoalForm } from '@/hooks/useGoalForm';
import { Goal, GoalFormData } from '@/interfaces/goal';
import { getGoalColorHex } from '@/lib/goalColors';

import FormField from '../ui/FormField';
import { Input } from '../ui/Input';

import CustomCalendar from './calendar/CustomCalendar';
import ColorChipSelector from './ColorChipSelector';

interface GoalFormProps {
  editingGoal: Goal | null;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: GoalFormData) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  onFormChange?: (hasChanges: boolean) => void;
  isLoading: boolean;
}

const GoalForm = ({ editingGoal, onSubmit, onFormChange, isLoading }: GoalFormProps) => {
  const { control, handleSubmit, isValid, isEditMode } = useGoalForm({
    editingGoal,
    onFormChange,
  });

  const handleFormSubmit = async (data: GoalFormData) => {
    let formattedDeadlineDate = '';
    let dateObj: Date | null = null;
    if (data.deadlineDate instanceof Date && !isNaN(data.deadlineDate.getTime())) {
      dateObj = new Date(data.deadlineDate);
    } else if (typeof data.deadlineDate === 'string') {
      dateObj = new Date(data.deadlineDate);
    }
    if (dateObj) {
      const pad = (n: number) => n.toString().padStart(2, '0');
      const yyyy = dateObj.getFullYear();
      const mm = pad(dateObj.getMonth() + 1);
      const dd = pad(dateObj.getDate());
      formattedDeadlineDate = `${yyyy}-${mm}-${dd}T23:59:59`;
    }

    const hexColor = getGoalColorHex(data.color);
    await onSubmit({
      ...data,
      deadlineDate: formattedDeadlineDate,
      color: hexColor,
    } as unknown as GoalFormData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div>
        <FormField label="목표" htmlFor="title" className="mb-32">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="title"
                type="text"
                placeholder="목표의 이름을 적어주세요"
                inputSize="modal"
              />
            )}
          />
        </FormField>

        <FormField label="" className="mb-44">
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <ColorChipSelector selectedColor={field.value} onSelectColor={field.onChange} />
            )}
          />
        </FormField>

        <FormField label="마감 기한" htmlFor="deadlineDate">
          <Controller
            name="deadlineDate"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <CustomCalendar
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="날짜를 선택하세요"
                  minDate={new Date()}
                />
              </div>
            )}
          />
        </FormField>
      </div>

      <div className="mt-60 h-48 flex-shrink-0">
        <Button
          type="submit"
          size="modal"
          rounded="lg"
          variant="default"
          text="default"
          disabled={!isValid || isLoading}
          className="h-full w-full font-medium"
        >
          {isLoading ? '처리중...' : isEditMode ? '수정하기' : '생성하기'}
        </Button>
      </div>
    </form>
  );
};

export default GoalForm;
