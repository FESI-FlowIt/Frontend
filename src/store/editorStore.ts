import { Editor } from '@tiptap/react';
import { create } from 'zustand';

interface ToolbarState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrike: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  textAlign: 'left' | 'center' | 'right';
  isLink: boolean;
  isHighlight: boolean;
}

interface EditorStore {
  editor: Editor | null;
  content: string;
  plain: string;
  toolbarState: ToolbarState;

  // Actions
  setEditor: (editor: Editor | null) => void;
  updateContent: (content: string, plain: string) => void;
  updateToolbarState: () => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  editor: null,
  content: '',
  plain: '',

  toolbarState: {
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrike: false,
    isBulletList: false,
    isOrderedList: false,
    textAlign: 'left',
    isLink: false,
    isHighlight: false,
  },

  setEditor: editor => {
    set({ editor });

    if (editor) {
      const updateToolbar = () => {
        get().updateToolbarState();
      };

      editor.on('selectionUpdate', updateToolbar);
      editor.on('focus', updateToolbar);
      editor.on('blur', updateToolbar);
    }
  },

  updateContent: (content, plain) => {
    set({ content, plain });
  },

  updateToolbarState: () => {
    const { editor } = get();
    if (!editor) return;

    set({
      toolbarState: {
        isBold: editor.isActive('bold'),
        isItalic: editor.isActive('italic'),
        isUnderline: editor.isActive('underline'),
        isStrike: editor.isActive('strike'),
        isBulletList: editor.isActive('bulletList'),
        isOrderedList: editor.isActive('orderedList'),
        textAlign: editor.isActive({ textAlign: 'center' })
          ? 'center'
          : editor.isActive({ textAlign: 'right' })
            ? 'right'
            : 'left',
        isLink: editor.isActive('link'),
        isHighlight: editor.isActive('highlight'),
      },
    });
  },
}));
