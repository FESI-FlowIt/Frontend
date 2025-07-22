import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Dialog from '@/components/ui/Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/ui/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: { type: 'boolean' } },
    overlay: {
      control: { type: 'select' },
      options: ['default', 'dark', 'light'],
    },
    rounded: {
      control: { type: 'select' },
      options: ['default', 'none'],
    },
    closeOnOverlayClick: {
      control: { type: 'boolean' },
    },
    closeOnEscape: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: (args: Story['args']) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          다이얼로그 열기
        </button>
        <Dialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex flex-col items-center justify-center gap-30">
            <p>기본 다이얼로그 내용입니다.</p>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-primary-01 h-48 w-200 rounded-lg"
            >
              확인
            </button>
          </div>
        </Dialog>
      </>
    );
  },
};

export const ErrorAlert: Story = {
  render: (args: Story['args']) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)} className="rounded bg-red-500 px-4 py-2 text-white">
          오류 다이얼로그 열기
        </button>
        <Dialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex flex-col items-center justify-center gap-30">
            <p>오류가 발생했습니다.</p>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-primary-01 h-48 w-200 rounded-lg"
            >
              확인
            </button>
          </div>
        </Dialog>
      </>
    );
  },
  args: {
    overlay: 'dark',
  },
};

export const SharpBorder: Story = {
  render: (args: Story['args']) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)} className="bg-purple-500 px-4 py-2 text-white">
          각진 다이얼로그 열기
        </button>
        <Dialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex flex-col items-center justify-center gap-30">
            <p>각진 다이얼로그 입니다.</p>
            <button onClick={() => setIsOpen(false)} className="bg-primary-01 h-48 w-200">
              확인
            </button>
          </div>
        </Dialog>
      </>
    );
  },
  args: {
    rounded: 'none',
  },
};
