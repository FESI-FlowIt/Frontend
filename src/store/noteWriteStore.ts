import { create } from 'zustand';

import { Todo } from '@/interfaces/todo';

interface NoteWriteStore {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  wordCount: number;
  setWordCount: (wordCount: number) => void;
  todoId: number | null;
  setTodoId: (todoId: number) => void;
  goalTitle: string;
  setGoalTitle: (goalTitle: string) => void;
  link: string | null;
  setLink: (link: string | null) => void;
  reset: () => void;
  todo: Todo | null;
  setTodo: (todo: Todo) => void;
}

const initialState = {
  title: '',
  content: '',
  wordCount: 0,
  todoId: null,
  goalTitle: '',
  link: null,
  todo: null,
};

export const useNoteWriteStore = create<NoteWriteStore>(set => ({
  ...initialState,
  setTitle: (title: string) => set({ title }),
  setContent: (content: string) => set({ content }),
  setWordCount: (wordCount: number) => set({ wordCount }),
  setTodoId: (todoId: number) => set({ todoId }),
  setGoalTitle: (goalTitle: string) => set({ goalTitle }),
  setLink: (link: string | null) => set({ link }),
  reset: () => set({ ...initialState }),
  setTodo: (todo: Todo) => set({ todo }),
}));
