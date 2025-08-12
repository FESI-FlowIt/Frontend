'use client';
import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import LinkModal from '@/components/todos/LinkModal';
import { useCreateNote } from '@/hooks/useNotes';
import { useTempNote } from '@/hooks/useTempNote';
import type { NoteFormData } from '@/interfaces/note';
import { useNoteWriteStore } from '@/store/noteWriteStore';

import NoteContentEditor from './NoteContentEditor';
import NoteHeader from './NoteHeader';
import NoteInfo from './NoteInfo';
import NoteToolbar from './NoteToolbar';
interface NoteWriteClientProps {
  todoId: number;
}

const NoteWriteClient = ({ todoId }: NoteWriteClientProps) => {
  const router = useRouter();
  const { title, content, wordCount, link, setTodoId, setLink, reset } = useNoteWriteStore();
  const { mutate: createNote } = useCreateNote();

  const { hasTemp, saveTemp } = useTempNote(todoId);

  useEffect(() => {
    if (todoId !== null) {
      setTodoId(todoId);
    }
    return () => {
      reset();
    };
  }, [todoId, setTodoId, reset]);

  const handleSave = async (type: 'draft' | 'complete') => {
    if (todoId === null) {
      throw new Error('todoId must not be null');
    }

    const body: NoteFormData = {
      title,
      content,
      wordCount,
      todoId,
      ...(link && { link }),
    };

    if (type === 'draft') {
      await saveTemp(body);
      return;
    }

    createNote(body, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  const handleAddNoteLink = (url: string) => {
    setLink(url);
  };

  const isCompleteEnabled = Boolean(title?.trim() && content?.trim());

  return (
    <div className="relative h-screen w-full md:h-full md:max-w-793">
      <div className="relative h-screen md:h-full">
        <div className="mb-40">
          <NoteHeader
            onDraft={() => handleSave('draft')}
            onComplete={() => handleSave('complete')}
            isCompleteEnabled={isCompleteEnabled}
          />
        </div>
        <NoteInfo hasTemp={hasTemp} />
        <div className="my-24">
          <NoteContentEditor />
        </div>
        <div className="fixed right-0 bottom-24 left-0 z-10 md:absolute">
          <NoteToolbar />
        </div>
      </div>

      {/* 링크 모달 */}
      <LinkModal onAddNoteLink={handleAddNoteLink} />
    </div>
  );
};

export default NoteWriteClient;
