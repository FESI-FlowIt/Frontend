'use client';

import React from 'react';

import { useToastStore } from '@/store/toastStore';

import { Toast } from './Toast';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-24 z-50 max-w-400 space-y-12">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
};
