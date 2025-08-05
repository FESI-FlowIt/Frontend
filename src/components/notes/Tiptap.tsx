'use client';
import React, { useEffect } from 'react';

import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TiptapProps {
  content: string;
  onUpdate: (html: string, plain: string) => void;
  className?: string;
  maxLength?: number;
  placeholder?: string;
  onEditorReady?: (editor: Editor | null) => void;
}

const Tiptap: React.FC<TiptapProps> = ({
  content,
  onUpdate,
  className,
  maxLength,
  placeholder,
  onEditorReady,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({
        multicolor: true, // 다양한 색상 지원
      }),
      Placeholder.configure({
        placeholder: placeholder || '',
        emptyEditorClass: 'is-editor-empty', // 에디터가 비었을 때 적용될 클래스
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'listItem'],
        alignments: ['left', 'center', 'right'], // 명시적으로 정렬 옵션 추가
        defaultAlignment: 'left', // 기본 정렬 설정
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `${className || ''} prose`,
        spellCheck: 'false',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const plain = editor.getText();
      onUpdate(html, plain);
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (onEditorReady) onEditorReady(editor);
  }, [editor, onEditorReady]);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    if (!editor || !maxLength) return;
    const handleInput = () => {
      const text = editor.getText();
      if (text.length > maxLength) {
        editor.commands.setContent(text.slice(0, maxLength));
      }
    };
    editor.on('transaction', handleInput);
    return () => {
      editor.off('transaction', handleInput);
    };
  }, [editor, maxLength]);

  return <EditorContent editor={editor} />;
};

export default Tiptap;
