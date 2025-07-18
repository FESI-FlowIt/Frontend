import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import FileUpload from '@/components/todos/FileUpload';
import { Attachment } from '@/interfaces/todo';

const meta: Meta<typeof FileUpload> = {
  title: 'components/todos/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '파일 업로드 컴포넌트입니다. 드래그 앤 드롭과 클릭으로 파일을 선택할 수 있으며, 파일 크기와 형식을 검증합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxFiles: { control: { type: 'number' } },
    maxFileSize: { control: { type: 'number' } },
    acceptedTypes: { control: { type: 'object' } },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const 기본: Story = {
  render: args => {
    const [attachments, setAttachments] = useState<Attachment[]>([]);

    return (
      <FileUpload
        {...args}
        attachments={attachments}
        onFilesChange={files => {
          console.log('선택된 파일:', files);
          const newAttachments: Attachment[] = files.map(file => ({
            type: 'file',
            url: URL.createObjectURL(file), // 임시 URL
            fileName: file.name,
            size: file.size,
          }));
          setAttachments(newAttachments);
        }}
      />
    );
  },
};

export const 업로드완료상태: Story = {
  render: args => {
    const [attachments, setAttachments] = useState<Attachment[]>([
      {
        type: 'file',
        url: 'https://example.com/document.pdf',
        fileName: 'document.pdf',
        size: 1024000,
      },
      {
        type: 'file',
        url: 'https://example.com/image.jpg',
        fileName: 'image.jpg',
        size: 512000,
      },
    ]);

    return (
      <FileUpload
        {...args}
        attachments={attachments}
        onFilesChange={files => {
          console.log('선택된 파일:', files);
          const newAttachments: Attachment[] = files.map(file => ({
            type: 'file',
            url: URL.createObjectURL(file),
            fileName: file.name,
            size: file.size,
          }));
          setAttachments(newAttachments);
        }}
      />
    );
  },
};
