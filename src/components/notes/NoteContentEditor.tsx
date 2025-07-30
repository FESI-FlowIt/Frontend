import React, { useEffect, useRef, useState } from 'react';

const MAX_LENGTH = 10000;

const NoteContentEditor = () => {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height as content grows
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [content]);

  return (
    <form>
      <textarea
        ref={textareaRef}
        className="text-body-m-16 placeholder:text-text-04 w-full resize-none bg-transparent outline-none"
        placeholder="이 곳을 클릭해 노트 작성을 시작해주세요."
        value={content}
        onChange={e => setContent(e.target.value)}
        maxLength={MAX_LENGTH}
        rows={1}
        style={{ minHeight: 24 }}
      />
      <div className="text-body-m-12 text-text-03 mt-12 text-left">
        공백포함 : 총 {content.length}자 | 공백제외 : 총 {content.replace(/\s/g, '').length}자
      </div>
    </form>
  );
};

export default NoteContentEditor;
