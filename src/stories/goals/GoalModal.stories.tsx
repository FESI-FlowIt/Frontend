import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GoalModal from '@/components/goals/GoalModal';
import { useModalStore } from '@/store/modalStore';

// 스토리북 전용 단순 QueryClient (실제 네트워크 요청 없음)
const simpleQueryClient = new QueryClient({
  defaultOptions: {
    queries: { enabled: false }, // 모든 쿼리 비활성화
    mutations: { retry: false }, // 재시도 없음
  },
});

const meta: Meta<typeof GoalModal> = {
  title: 'Components/goals/GoalModal',
  component: GoalModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '🎯 목표 생성/수정 Modal (Storybook 모드: 실제 API 호출 없이 UI만 테스트)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    Story => (
      <QueryClientProvider client={simpleQueryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GoalModal>;

// 목표 생성 모달 테스트
export const CreateGoal: Story = {
  render: () => {
    const { openGoalModal } = useModalStore();

    return (
      <div>
        <button
          onClick={() => openGoalModal()}
          className="rounded-8 bg-primary-01 hover:bg-primary-02 px-16 py-8 text-white"
        >
          목표 생성 모달 열기
        </button>
        <GoalModal />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '새로운 목표를 생성하는 모달입니다. "목표 생성 모달 열기" 버튼을 클릭하면 모달이 열립니다.',
      },
    },
  },
};

// 목표 수정 모달 테스트
export const EditGoal: Story = {
  render: () => {
    const { openGoalEditModal } = useModalStore();

    const handleEditGoal = () => {
      // 편집할 목표 데이터 예시 (Goal 인터페이스에 맞춤)
      const sampleGoal = {
        goalId: '1',
        title: '기존 목표 제목',
        color: '#FF6B6B',
        deadlineDate: '2024-12-31',
        isPinned: false,
        progress: 45,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };

      openGoalEditModal(sampleGoal);
    };

    return (
      <div>
        <button
          onClick={handleEditGoal}
          className="rounded-8 bg-secondary-01 hover:bg-secondary-02 px-16 py-8 text-white"
        >
          목표 수정 모달 열기
        </button>
        <GoalModal />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '기존 목표를 수정하는 모달입니다. 편집할 목표 데이터가 미리 입력된 상태로 모달이 열립니다.',
      },
    },
  },
};

// 기능 안내
export const Features: Story = {
  render: () => {
    const { openGoalModal, openGoalEditModal } = useModalStore();

    const handleEditGoal = () => {
      const sampleGoal = {
        goalId: '1',
        title: '샘플 목표',
        color: '#4ECDC4',
        deadlineDate: '2024-12-31',
        isPinned: true,
        progress: 75,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };
      openGoalEditModal(sampleGoal);
    };

    return (
      <div className="space-y-16">
        <div className="flex gap-12">
          <button
            onClick={() => openGoalModal()}
            className="rounded-8 bg-primary-01 hover:bg-primary-02 px-16 py-8 text-white"
          >
            목표 생성
          </button>
          <button
            onClick={handleEditGoal}
            className="rounded-8 bg-secondary-01 hover:bg-secondary-02 px-16 py-8 text-white"
          >
            목표 수정
          </button>
        </div>

        <div className="max-w-md text-sm text-gray-600">
          <h3 className="mb-8 font-semibold">GoalModal 주요 기능:</h3>
          <ul className="space-y-4">
            <li>
              • <strong>목표 생성:</strong> 제목, 색상, 마감일을 입력하여 새 목표 생성
            </li>
            <li>
              • <strong>목표 수정:</strong> 기존 목표의 정보를 수정
            </li>
            <li>
              • <strong>변경사항 감지:</strong> 폼에 변경사항이 있을 때만 확인 다이얼로그 표시
            </li>
            <li>
              • <strong>키보드 지원:</strong> ESC(취소), Enter(확인) 키 지원
            </li>
            <li>
              • <strong>상태 관리:</strong> zustand store와 연동
            </li>
          </ul>
        </div>

        <GoalModal />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'GoalModal의 모든 기능을 테스트할 수 있는 스토리입니다. 생성/수정 모드를 모두 확인할 수 있습니다.',
      },
    },
  },
};
