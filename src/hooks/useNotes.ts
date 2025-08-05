import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notesApi } from '@/api/notesApi';
import type { NoteFormData } from '@/interfaces/note';

export const NOTE_QUERY_KEY = 'notes';
export const TEMP_NOTE_QUERY_KEY = 'tempNote';

// 노트 생성
export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noteData: NoteFormData) => {
      const response = await notesApi.createNote(noteData);
      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTE_QUERY_KEY] });
    },
  });
};
