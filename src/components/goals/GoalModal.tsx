'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import AddNewGoalIcon from '@/assets/AddNewGoalIcon.svg';
import CloseIcon from '@/assets/CloseIcon.svg';
import { Button } from '@/components/ui/Button';
import { GoalFormData, goalFormSchema } from '@/interfaces/goal';

import FormField from '../ui/FormField';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal';

import ColorChipSelector from './ColorChipSelector';
import CustomCalendar from './CustomCalendar';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode?: boolean;
  initialValue?: Partial<GoalFormData>;
}

const GoalModal: React.FC<GoalModalProps> = ({
  isOpen,
  onClose,
  isEditMode = false,
  initialValue = { title: '', color: '', dueDate: undefined },
}) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalFormSchema),
    mode: 'onChange',
    defaultValues: initialValue,
  });

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValue);
    }
  }, [initialValue, isOpen, reset]);

  const handleFormSubmit = (data: GoalFormData) => {
    alert(JSON.stringify(data, null, 2));
    onClose();
    reset(initialValue);
  };

  const handleClose = () => {
    onClose();
    reset(initialValue);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="goal"
      padding="default"
      margin="default"
      rounded="default"
      layer="base"
    >
      <div className="mb-52 flex items-center justify-between">
        <h2 className="text-display-24 flex items-center text-2xl font-bold text-gray-800">
          <AddNewGoalIcon className="fill-snackbar mr-12 h-24 w-24" />
          {isEditMode ? '목표 수정' : '목표 생성'}
        </h2>
        <button
          onClick={handleClose}
          className="h-12 w-12 cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
        >
          <CloseIcon className="fill-snackbar" />
        </button>
      </div>

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

          <FormField label="마감 기한" htmlFor="dueDate">
            <Controller
              name="dueDate"
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
        <div className="mt-60 h-48 flex-shrink-0 border-t border-gray-100">
          <Button
            type="submit"
            size="modal"
            rounded="lg"
            variant="default"
            text="default"
            disabled={!isValid}
            className="h-full w-full font-medium"
          >
            {isEditMode ? '수정하기' : '생성하기'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GoalModal;
