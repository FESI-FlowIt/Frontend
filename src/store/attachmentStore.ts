/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import { Attachment } from '@/interfaces/todo';

interface AttachmentState {
  // 상태
  attachments: Attachment[];
  uploadedFiles: File[];
  isUploading: boolean;
  errors: string[];

  // 액션

  setAttachments: (attachments: Attachment[]) => void;
  addAttachments: (attachments: Attachment[]) => void;
  removeAttachment: (index: number) => void;
  clearAttachments: () => void;

  // 파일 관련
  setUploadedFiles: (files: File[]) => void;
  addUploadedFiles: (files: File[]) => void;
  clearUploadedFiles: () => void;

  // 파일 → Attachment 변환
  processFiles: (files: File[]) => void;
  processLinks: (links: Attachment[]) => void;

  // 에러 관리
  setErrors: (errors: string[]) => void;
  clearErrors: () => void;

  // 타입별 필터
  getFileAttachments: () => Attachment[];
  getLinkAttachments: () => Attachment[];

  // 초기화
  reset: () => void;
}

export const useAttachmentStore = create<AttachmentState>((set, get) => ({
  // 초기 상태
  attachments: [],
  uploadedFiles: [],
  isUploading: false,
  errors: [],

  // 기본 액션
  setAttachments: attachments => set({ attachments }),

  addAttachments: newAttachments =>
    set(state => ({
      attachments: [...state.attachments, ...newAttachments],
    })),

  removeAttachment: index =>
    set(state => ({
      attachments: state.attachments.filter((_, i) => i !== index),
    })),

  clearAttachments: () => set({ attachments: [] }),

  // 파일 관련
  setUploadedFiles: files => set({ uploadedFiles: files }),

  addUploadedFiles: files =>
    set(state => ({
      uploadedFiles: [...state.uploadedFiles, ...files],
    })),

  clearUploadedFiles: () => set({ uploadedFiles: [] }),

  processFiles: files => {
    const fileAttachments: Attachment[] = files.map(file => ({
      type: 'file',
      size: file.size,
      url: URL.createObjectURL(file),
      fileName: file.name,
    }));

    set(state => ({
      attachments: [...state.attachments.filter(att => att.type !== 'file'), ...fileAttachments],
      uploadedFiles: files,
    }));
  },

  processLinks: (links: Attachment[]) => {
    set(state => ({
      attachments: [...state.attachments.filter(att => att.type !== 'link'), ...links],
    }));
  },

  // 에러 관리
  setErrors: errors => set({ errors }),
  clearErrors: () => set({ errors: [] }),

  // 타입별 필터
  getFileAttachments: () => get().attachments.filter(att => att.type === 'file'),
  getLinkAttachments: () => get().attachments.filter(att => att.type === 'link'),

  // 초기화
  reset: () =>
    set({
      attachments: [],
      uploadedFiles: [],
      isUploading: false,
      errors: [],
    }),
}));
