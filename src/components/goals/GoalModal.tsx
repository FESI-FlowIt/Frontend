'use client';

import { useState } from 'react';

import CloseIcon from '@/assets/icons/close.svg';
import GoalIcon from '@/assets/icons/goal.svg';
import { useCreateGoal, useUpdateGoal } from '@/hooks/useGoals';
import { GoalFormData } from '@/interfaces/goal';
import { useModalStore } from '@/store/modalStore';

import ConfirmDialog from '../todos/ConfirmDialog';
import Modal from '../ui/Modal';

import GoalForm from './GoalForm';

const GoalModal = () => {
  const { goalModalIsOpen, closeGoalModal, editingGoal } = useModalStore();
  const createGoal = useCreateGoal();
  const updateGoal = useUpdateGoal();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [hasFormChanges, setHasFormChanges] = useState(false);

  const isEditMode = !!editingGoal;
  const isLoading = createGoal.isPending || updateGoal.isPending;

  const handleSubmit = async (data: GoalFormData) => {
    try {
      if (isEditMode && editingGoal) {
        await updateGoal.mutateAsync({
          goalId: editingGoal.goalId,
          data,
        });
      } else {
        await createGoal.mutateAsync(data);
      }
      closeGoalModal();
    } catch (error) {
      console.error('목표 처리 실패:', error);
    }
  };

  const handleClose = () => {
    if (hasFormChanges) {
      setShowConfirmDialog(true);
      return;
    }

    closeGoalModal();
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    closeGoalModal();
  };

  const handleFormChange = (hasChanges: boolean) => {
    setHasFormChanges(hasChanges);
  };

  return (
    <>
      <Modal
        isOpen={goalModalIsOpen}
        onClose={handleClose}
        size="goal"
        padding="default"
        rounded="responsive"
        margin="none"
        layer="base"
      >
        <div className="mb-52 flex items-center justify-between">
          <h2 className="text-display-24 text-text-01 flex items-center font-bold">
            <GoalIcon className="text-gray-01 mr-12" width={24} height={24} fill="currentColor" />
            {isEditMode ? '목표 수정' : '목표 생성'}
          </h2>
          <button
            onClick={handleClose}
            className="text-text-03 h-12 w-12 cursor-pointer transition-colors"
          >
            <CloseIcon className="text-text-03" width={12} height={12} fill="currentColor" />
          </button>
        </div>

        <GoalForm
          editingGoal={editingGoal}
          onSubmit={handleSubmit}
          onFormChange={handleFormChange}
          isLoading={isLoading}
        />
      </Modal>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmClose}
        title="잠깐!"
        confirmText="나가기"
        cancelText="계속 작성"
      />
    </>
  );
};

export default GoalModal;
