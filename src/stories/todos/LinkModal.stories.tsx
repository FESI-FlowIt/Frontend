import type { Meta, StoryObj } from '@storybook/nextjs';

import LinkModal from '@/components/todos/LinkModal';
import { Attachment } from '@/interfaces/todo';
import { useModalStore } from '@/store/modalStore';

const meta: Meta<typeof LinkModal> = {
  title: 'components/todos/LinkModal',
  component: LinkModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '링크 추가 모달 컴포넌트입니다. URL을 입력하여 링크를 추가할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onAddLink: { action: 'addLink' },
  },
};

export default meta;
type Story = StoryObj<typeof LinkModal>;

export const Default: Story = {
  render: args => {
    const { openLinkModal } = useModalStore();

    return (
      <>
        <button
          onClick={openLinkModal}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          링크 모달 열기
        </button>
        <LinkModal
          {...args}
          onAddLink={(link: Attachment) => {
            console.log('링크 추가:', link);
          }}
        />
      </>
    );
  },
};

export const ValidationTest: Story = {
  render: args => {
    const { openLinkModal } = useModalStore();

    return (
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={openLinkModal}
          className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          유효성 검증 테스트
        </button>
        <p className="mt-2 text-sm text-gray-600">
          잘못된 URL (예: &quot;invalid-url&quot;)을 입력해보세요.
        </p>
        <LinkModal
          {...args}
          onAddLink={(link: Attachment) => {
            console.log('링크 추가:', link);
          }}
        />
      </div>
    );
  },
};

import React, { useState } from 'react';

export const URLNormalizationTest: Story = {
  render: args => {
    const { openLinkModal } = useModalStore();
    const [answer, setAnswer] = useState<Attachment | null>(null);
    return (
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={openLinkModal}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          URL 정규화 테스트
        </button>
        <p className="mt-2 text-sm text-gray-600">
          &quot;naver.com&quot; 또는 &quot;www.google.com&quot;을 입력해보세요.
        </p>
        <LinkModal
          {...args}
          onAddLink={(link: Attachment) => {
            setAnswer(link);
          }}
        />
        <p>{answer ? answer.url : ''}</p>
      </div>
    );
  },
};
