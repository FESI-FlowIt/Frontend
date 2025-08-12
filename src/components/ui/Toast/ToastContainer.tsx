'use client';

import React from 'react';

import { useToastStore } from '@/store/toastStore';

import { Toast } from './Toast';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed z-50 space-y-12 sm:bottom-16 sm:left-1/2 sm:max-w-[90vw] sm:translate-x-[-50%] sm:px-16 md:top-24 md:right-24 md:bottom-auto md:left-auto md:max-w-400 md:translate-x-0"
      style={{ pointerEvents: 'none' }}
    >
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
};
