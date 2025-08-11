import { useEffect, useState } from 'react';

import { getGoalColorHex } from '@/lib/goalColors';
import { useEditorStore } from '@/store/editorStore';
import { useModalStore } from '@/store/modalStore';

export const useNoteToolbar = () => {
  const editor = useEditorStore(state => state.editor);
  const toolbarState = useEditorStore(state => state.toolbarState);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const { openLinkModal } = useModalStore();

  const executeCommand = (variant: string) => {
    if (!editor) return;

    switch (variant) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'strike':
        editor.chain().focus().toggleStrike().run();
        break;
      case 'underline':
        editor.chain().focus().toggleUnderline?.().run();
        break;
      case 'bullet':
        editor.chain().focus().toggleBulletList().run();
        break;
      case 'numbering':
        editor.chain().focus().toggleOrderedList().run();
        break;
      case 'alignmentLeft':
        editor.chain().focus().setTextAlign('left').run();
        break;
      case 'alignmentCenter':
        editor.chain().focus().setTextAlign('center').run();
        break;
      case 'alignmentRight':
        editor.chain().focus().setTextAlign('right').run();
        break;
      case 'coloring':
        setShowColorPalette(prev => !prev);
        break;
      case 'link':
        openLinkModal();
        break;
    }
  };

  const activeMap: Record<string, boolean> = {
    bold: toolbarState.isBold,
    italic: toolbarState.isItalic,
    underline: toolbarState.isUnderline,
    strike: toolbarState.isStrike,
    bullet: toolbarState.isBulletList,
    numbering: toolbarState.isOrderedList,
    alignmentLeft: toolbarState.textAlign === 'left',
    alignmentCenter: toolbarState.textAlign === 'center',
    alignmentRight: toolbarState.textAlign === 'right',
    coloring: toolbarState.isHighlight || false,
    link: toolbarState.isLink,
  };

  // 툴바 버튼 클릭 핸들러
  const handleToolbarAction = (variant: string) => {
    executeCommand(variant);
  };

  // 색상 적용 함수
  const applyHighlightColor = (colorVar: string) => {
    if (editor) {
      const hexColor = getGoalColorHex(colorVar);
      editor.chain().focus().toggleHighlight({ color: hexColor }).run();
      setShowColorPalette(false);
    }
  };

  // 외부 클릭 시 팔레트 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showColorPalette) {
        const target = event.target as Element;
        if (!target.closest('[data-color-palette]')) {
          setShowColorPalette(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showColorPalette]);

  return {
    activeMap,
    showColorPalette,
    handleToolbarAction,
    applyHighlightColor,
  };
};
