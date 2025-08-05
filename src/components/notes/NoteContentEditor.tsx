import React, { memo, useCallback } from 'react';

import { useEditorStore } from '@/store/editorStore';
import { useNoteWriteStore } from '@/store/noteWriteStore';

import Tiptap from './Tiptap';

const NoteContentEditor = memo(() => {
  const setEditor = useEditorStore(state => state.setEditor);
  const updateContent = useEditorStore(state => state.updateContent);

  // zustand noteWriteStore에서 content, setContent, wordCount, setWordCount 구독
  const content = useNoteWriteStore(state => state.content);
  const setContent = useNoteWriteStore(state => state.setContent);
  const wordCount = useNoteWriteStore(state => state.wordCount);
  const setWordCount = useNoteWriteStore(state => state.setWordCount);

  //TODO: debouncing 적용을 통해 실시간 업데이트를 방지하고 성능 최적화

  const handleUpdate = useCallback(
    (newContent: string, newPlain: string) => {
      updateContent(newContent, newPlain);
      setContent(newContent);
      // HTML 태그를 제거한 순수 텍스트의 공백 제외 글자수 계산
      const plainTextOnly = newPlain.replace(/<[^>]*>/g, '').replace(/\s/g, '');
      setWordCount(plainTextOnly.length);
    },
    [updateContent, setContent, setWordCount],
  );
  const plain = useEditorStore(state => state.plain);

  return (
    <>
      <div className="w-full">
        <Tiptap
          content={content}
          onUpdate={handleUpdate}
          className="w-full resize-none bg-transparent outline-none"
          maxLength={1000}
          placeholder="이 곳을 클릭해 노트 작성을 시작해주세요."
          onEditorReady={setEditor}
        />
        <div className="text-body-m-12 text-text-03 mt-12 text-left">
          공백포함 : 총 {plain.length}자 | 공백제외 : 총 {wordCount}자
        </div>
      </div>
    </>
  );
});

NoteContentEditor.displayName = 'NoteContentEditor';

export default NoteContentEditor;
