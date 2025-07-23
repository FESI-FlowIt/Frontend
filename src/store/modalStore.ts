import { create } from 'zustand';

import { Goal } from '@/interfaces/goal';
import { Todo } from '@/interfaces/todo';

interface ModalState {
  todoModalIsOpen: boolean;
  linkModalIsOpen: boolean;
  goalModalIsOpen: boolean;
  editingTodo: Todo | null;
  editingGoal: Goal | null;

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

  // eslint-disable-next-line no-unused-vars
  openGoalEditModal: (goal: Goal) => void;
  closeGoalEditModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  todoModalIsOpen: false,
  linkModalIsOpen: false,
  goalModalIsOpen: false,
  editingTodo: null,
  editingGoal: null,

  openTodoModal: () =>
    set({
      todoModalIsOpen: true,
      editingTodo: null,
    }),
  closeTodoModal: () => set({ todoModalIsOpen: false }),
  openLinkModal: () => set({ linkModalIsOpen: true }),
  closeLinkModal: () => set({ linkModalIsOpen: false }),
  openGoalModal: () =>
    set({
      goalModalIsOpen: true,
      editingGoal: null,
    }),
  closeGoalModal: () => set({ goalModalIsOpen: false, editingGoal: null }),

  closeAllModals: () =>
    set({
      todoModalIsOpen: false,
      linkModalIsOpen: false,
      goalModalIsOpen: false,
      editingGoal: null,
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

  openGoalEditModal: (goal: Goal) =>
    set({
      goalModalIsOpen: true,
      editingGoal: goal,
    }),
  closeGoalEditModal: () =>
    set({
      goalModalIsOpen: false,
      editingGoal: null,
    }),
}));
