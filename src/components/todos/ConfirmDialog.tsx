'use client';

import React from 'react';

import CloseIcon from '@/assets/CloseIcon.svg';
import { Button } from '@/components/ui/Button';
import Dialog from '@/components/ui/Dialog';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  showCloseButton?: boolean;
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = '잠깐!',
  message = '정말 나가시겠어요?\n작성된 내용이 모두 사라집니다.',
  confirmText = '확인',
  cancelText = '취소',
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      size="default"
      overlay="default"
      closeOnOverlayClick={false}
      closeOnEscape={false}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-body-sb-20 font-semibold text-slate-800">{title}</h2>
        </div>

        {/* Body */}
        <div className="mb-24 flex flex-1 items-center justify-center text-center">
          <p className="text-body-m-16 text-text-02 leading-relaxed">
            {message.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < message.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-12 px-57">
          <Button
            variant="white"
            text="primary"
            size="modal"
            onClick={onClose}
            className="border-1"
            disabled={false}
          >
            {cancelText}
          </Button>
          <Button variant="default" size="modal" onClick={handleConfirm} disabled={false}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
