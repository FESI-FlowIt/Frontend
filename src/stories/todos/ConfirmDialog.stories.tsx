import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import ConfirmDialog from '@/components/todos/ConfirmDialog';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Components/todos/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '확인 다이얼로그입니다. 확인 모달은 사용자가 실수로 끄는걸 방지하기위해 ESC 키와 오버레이 클릭으로 닫기 기능이 막혀있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: { type: 'boolean' } },
    title: { control: { type: 'text' } },
    message: { control: { type: 'text' } },
    confirmText: { control: { type: 'text' } },
    cancelText: { control: { type: 'text' } },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const ConfirmDeletion: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)} className="rounded bg-red-500 px-4 py-2 text-white">
          삭제 확인 다이얼로그 열기
        </button>
        <ConfirmDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('삭제 확인');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  args: {
    title: '할 일 삭제',
    message: '정말로 이 할 일을 삭제하시겠습니까?',
    confirmText: '삭제',
    cancelText: '취소',
  },
};

export const ConfirmDataDeletion: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)} className="rounded bg-red-600 px-4 py-2 text-white">
          데이터 삭제 확인 다이얼로그 열기
        </button>
        <ConfirmDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('데이터 삭제 확인');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  args: {
    title: '데이터 삭제',
    message: '모든 데이터가 삭제되며 복구할 수 없습니다. 정말로 삭제하시겠습니까?',
    confirmText: '삭제',
    cancelText: '취소',
  },
};
