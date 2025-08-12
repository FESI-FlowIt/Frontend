'use client';

import { ToastAction, ToastInput } from '@/interfaces/toast';
import { useToastStore } from '@/store/toastStore';

export const useToast = () => {
  const { addToast } = useToastStore();

  const toast = {
    success: (message: string, action?: ToastAction, duration?: number) => {
      addToast({
        type: 'success',
        message,
        action,
        duration,
      });
    },

    error: (message: string, retryFn?: () => void, duration?: number) => {
      addToast({
        type: 'error',
        message,
        action: retryFn ? { label: '재시도', onClick: retryFn } : undefined,
        duration: duration ?? 8000, // 에러는 좀 더 오래 표시
      });
    },

    warning: (message: string, action?: ToastAction, duration?: number) => {
      addToast({
        type: 'warning',
        message,
        action,
        duration,
      });
    },

    info: (message: string, action?: ToastAction, duration?: number) => {
      addToast({
        type: 'info',
        message,
        action,
        duration,
      });
    },

    custom: (toastInput: ToastInput) => {
      addToast(toastInput);
    },
  };

  return toast;
};
