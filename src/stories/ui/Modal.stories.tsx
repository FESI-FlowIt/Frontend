import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Modal from '@/components/ui/Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/ui/Modal',
  component: Modal,
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['goal', 'todo', 'link'],
    },
    overlay: {
      control: { type: 'select' },
      options: ['default', 'dark', 'light'],
    },
    layer: {
      control: { type: 'select' },
      options: ['base', 'stacked'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWithHooks = (args: Story['args'] = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-500 px-16 py-8 text-white hover:bg-blue-600"
      >
        모달 열기
      </button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: ModalWithHooks,
  args: {
    size: 'todo',
    children: (
      <div>
        <h2 className="mb-4 text-xl font-bold">기본 모달</h2>
        <p className="mb-6 text-gray-600">기본 스타일의 모달입니다.</p>
        <button className="rounded bg-blue-500 px-4 py-2 text-white">확인</button>
      </div>
    ),
  },
};

export const GoalModal: Story = {
  render: ModalWithHooks,
  args: {
    size: 'goal',
    children: (
      <div>
        <h2 className="mb-6 text-xl font-bold">🎯 목표 생성</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="목표의 이름을 적어주세요"
            className="w-full rounded-lg border px-3 py-2"
          />
          <input type="date" className="w-full rounded-lg border px-3 py-2" />
        </div>
        <button className="mt-6 w-full rounded-lg bg-blue-500 py-3 text-white">생성하기</button>
      </div>
    ),
  },
};

export const LinkModal: Story = {
  render: ModalWithHooks,
  args: {
    size: 'link',
    layer: 'stacked',
    children: (
      <div>
        <h2 className="mb-6 text-xl font-bold">🔗 링크 업로드</h2>
        <input
          type="url"
          placeholder="www.example.com"
          className="mb-6 w-full rounded-lg border px-3 py-2"
        />
        <div className="flex gap-3">
          <button className="flex-1 rounded-lg bg-gray-200 py-2">취소</button>
          <button className="flex-1 rounded-lg bg-blue-500 py-2 text-white">확인</button>
        </div>
      </div>
    ),
  },
};

export const DarkOverlay: Story = {
  render: ModalWithHooks,
  args: {
    size: 'todo',
    overlay: 'dark',
    children: (
      <div className="text-center">
        <h2 className="mb-4 text-xl font-bold">어두운 오버레이</h2>
        <p className="text-gray-600">배경이 더 어둡게 표시됩니다.</p>
      </div>
    ),
  },
};

export const StackedModal: Story = {
  render: () => {
    const [firstOpen, setFirstOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setFirstOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          첫 번째 모달 열기
        </button>

        <Modal isOpen={firstOpen} onClose={() => setFirstOpen(false)} size="todo">
          <div>
            <h2 className="mb-4 text-xl font-bold">첫 번째 모달</h2>
            <button
              onClick={() => setSecondOpen(true)}
              className="mr-2 rounded bg-green-500 px-4 py-2 text-white"
            >
              두 번째 모달 열기
            </button>
          </div>
        </Modal>

        <Modal isOpen={secondOpen} onClose={() => setSecondOpen(false)} size="link" layer="stacked">
          <div>
            <h2 className="mb-4 text-xl font-bold">두 번째 모달</h2>
            <p className="mb-4">스택된 모달입니다.</p>
            <button
              onClick={() => setSecondOpen(false)}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              닫기
            </button>
          </div>
        </Modal>
      </>
    );
  },
};
