'use client';
import React, { useEffect, useState } from 'react';

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
  const { title, content, wordCount, link, setTodoId, setLink, reset } = useNoteWriteStore();
  const { mutate: createNote } = useCreateNote();
  const [showSaveMessage, setShowSaveMessage] = useState(false);

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
      setShowSaveMessage(true);
      setTimeout(() => {
        setShowSaveMessage(false);
      }, 3000);
      return;
    }

    createNote(body);
  };

  const handleAddNoteLink = (url: string) => {
    setLink(url);
  };

  const isCompleteEnabled = Boolean(title?.trim() && content?.trim());

  return (
    <div className="relative h-full w-full">
      <div className="relative h-full max-w-793 sm:max-w-343 md:max-w-616 lg:max-w-793">
        <div className="mb-40">
          <NoteHeader
            onDraft={() => handleSave('draft')}
            onComplete={() => handleSave('complete')}
            isCompleteEnabled={isCompleteEnabled}
          />
          {showSaveMessage && (
            <div className="text-body-m-12 text-text-03 absolute right-0 mt-8">
              임시저장되었습니다.
            </div>
          )}
        </div>
        <NoteInfo hasTemp={hasTemp} />
        <div className="my-24">
          <NoteContentEditor />
        </div>
        <div className="fixed bottom-24 z-10 w-full sm:max-w-343 md:max-w-616 lg:max-w-793">
          <NoteToolbar />
        </div>
      </div>

      {/* 링크 모달 */}
      <LinkModal onAddNoteLink={handleAddNoteLink} />
    </div>
  );
};

export default NoteWriteClient;
