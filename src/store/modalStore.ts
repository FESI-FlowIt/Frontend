import { create } from 'zustand';

import { Todo } from '@/interfaces/todo';

interface ModalState {
  todoModalIsOpen: boolean;
  linkModalIsOpen: boolean;
  goalModalIsOpen: boolean;
  editingTodo: Todo | null;

  openTodoModal: () => void;
  closeTodoModal: () => void;
  openLinkModal: () => void;
  closeLinkModal: () => void;
  openGoalModal: () => void;
  closeGoalModal: () => void;
  closeAllModals: () => void;

  // eslint-disable-next-line no-unused-vars
  openTodoEditModal: (todo: Todo) => void;
  closeEditModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  todoModalIsOpen: false,
  linkModalIsOpen: false,
  goalModalIsOpen: false,
  editingTodo: null,

  openTodoModal: () =>
    set({
      todoModalIsOpen: true,
      editingTodo: null,
    }),
  closeTodoModal: () => set({ todoModalIsOpen: false }),
  openLinkModal: () => set({ linkModalIsOpen: true }),
  closeLinkModal: () => set({ linkModalIsOpen: false }),
  openGoalModal: () => set({ goalModalIsOpen: true }),
  closeGoalModal: () => set({ goalModalIsOpen: false }),

  closeAllModals: () =>
    set({
      todoModalIsOpen: false,
      linkModalIsOpen: false,
      goalModalIsOpen: false,
    }),
  openTodoEditModal: (todo: Todo) =>
    set({
      todoModalIsOpen: true,
      editingTodo: todo,
    }),
  closeEditModal: () =>
    set({
      todoModalIsOpen: false,
      editingTodo: null,
    }),
}));
