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
  todo: Todo;
}

const initialState = {
  title: '',
  content: '',
  wordCount: 0,
  todoId: null,
  goalTitle: '',
  link: null,
  todo: {} as Todo,
};

export const useNoteWriteStore = create<NoteWriteStore>(set => ({
  ...initialState,
  setTitle: title => set({ title }),
  setContent: content => set({ content }),
  setWordCount: wordCount => set({ wordCount }),
  setTodoId: todoId => set({ todoId }),
  setGoalTitle: goalTitle => set({ goalTitle }),
  setLink: link => set({ link }),
  reset: () => set({ ...initialState }),
  setTodo: (todo: Todo) => set({ todo }),
}));
