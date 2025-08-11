import { create } from 'zustand';

import { Toast, ToastInput } from '@/interfaces/toast';

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: ToastInput) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

export const useToastStore = create<ToastStore>(set => ({
  toasts: [],

  addToast: (toastInput: ToastInput) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const toast: Toast = {
      ...toastInput,
      id,
      duration: toastInput.duration ?? 5000, // 기본 5초
    };

    set(state => ({
      toasts: [...state.toasts, toast],
    }));
  },

  removeToast: (id: string) => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    }));
  },

  clearAll: () => {
    set({ toasts: [] });
  },
}));
