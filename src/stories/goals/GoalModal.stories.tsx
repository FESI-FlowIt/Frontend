import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import GoalModal from '@/components/goals/GoalModal';

const meta: Meta<typeof GoalModal> = {
  title: 'Components/goals/GoalModal',
  component: GoalModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '목표 생성/수정(Goal) Modal 컴포넌트입니다. 제목, 색상, 마감일을 입력할 수 있고, 생성/수정 모드를 처리합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof GoalModal>;

// ✅ 모달을 열 수 있는 버튼을 같은 Story에서 제공
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)} className="bg-primary-01 rounded-8 p-8">
          목표 생성 모달 열기
        </button>
        <GoalModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '아래 "목표 생성 모달 열기" 버튼을 눌러서 GoalModal 컴포넌트를 실제로 테스트할 수 있습니다.',
      },
    },
  },
};

export const CustomDescription: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)} className="bg-primary-01 rounded-8 p-8">
          목표 생성 모달 열기
        </button>
        <GoalModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <div className="mt-4 text-sm text-gray-600">
          <p>
            • “목표 생성” 버튼 클릭 시 모달이 열리고, 제목/색상/마감일을 직접 입력해 생성할 수
            있습니다.
          </p>
          <p>• 이미 존재하는 목표를 수정할 때는 &quot;목표 수정&quot; 모드로 표시됩니다.</p>
          <p>• 상태 관리는 zustand store(`useModalStore`)와 연동되어 있습니다.</p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '목표 생성/수정 모달의 동작/기능 안내. (스토리북 하단 버튼을 누르면 모달이 나옵니다)',
      },
    },
  },
};
