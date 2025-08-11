'use client';

import React, { useCallback, useEffect, useState } from 'react';

import ToastErrorIcon from '@/assets/icons/toast-error.svg';
import ToastInfoIcon from '@/assets/icons/toast-info.svg';
import ToastSuccessIcon from '@/assets/icons/toast-success.svg';
import ToastWarningIcon from '@/assets/icons/toast-warning.svg';
import { Toast as ToastType } from '@/interfaces/toast';
interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

export const Toast = ({ toast, onClose }: ToastProps) => {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(toast.id);
    }, 300); // 애니메이션 완료 후 제거
  }, [onClose, toast.id]);

  // 자동 닫힘 타이머
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, toast.id, handleClose]);

  const getToastStyles = () => {
    const baseStyles = 'rounded-12 bg-gray-01 px-16 py-12 transition-all duration-300 ease-in-out';
    const animationStyles = isLeaving ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100';

    return `${baseStyles} ${animationStyles}`;
  };

  return (
    <div className={getToastStyles()}>
      <div className="flex items-start gap-12">
        {toast.type === 'success' && <ToastSuccessIcon className="icon-success h-20 w-20" />}
        {toast.type === 'error' && <ToastErrorIcon className="icon-error h-20 w-20" />}
        {toast.type === 'warning' && <ToastWarningIcon className="icon-warning h-20 w-20" />}
        {toast.type === 'info' && <ToastInfoIcon className="icon-info h-20 w-20" />}

        <div className="flex-1">
          <p className="text-body-m-16 text-white">{toast.message}</p>

          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                handleClose();
              }}
              className="text-body-sb-12 text-primary-01 mt-8 underline hover:no-underline"
            >
              {toast.action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
