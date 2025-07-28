import type { Meta, StoryObj } from '@storybook/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import TodoModal from '@/components/todos/TodoModal';
import { Todo } from '@/interfaces/todo';
import { useModalStore } from '@/store/modalStore';

// React Query 클라이언트 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

const meta: Meta<typeof TodoModal> = {
  title: 'Components/todos/TodoModal',
  component: TodoModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '할 일 생성/수정 모달 컴포넌트입니다. 복잡한 폼 구성 요소들을 조합하여 완전한 할 일 관리 기능을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  argTypes: {
    todoToEdit: { control: { type: 'object' } },
    defaultGoalId: { control: { type: 'text' } },
  },
};

export default meta;
type Story = StoryObj<typeof TodoModal>;

export const TodoCreateModal: Story = {
  render: args => {
    const { openTodoModal } = useModalStore();

    return (
      <>
        <button
          onClick={openTodoModal}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          할 일 생성 모달 열기
        </button>
        <TodoModal {...args} />
      </>
    );
  },
};

export const DefaultGoalSelected: Story = {
  render: args => {
    const { openTodoModal } = useModalStore();

    return (
      <>
        <button
          onClick={openTodoModal}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          기본 목표로 할 일 생성
        </button>
        <TodoModal {...args} />
      </>
    );
  },
  args: {
    defaultGoalId: 1,
  },
};

export const TodoEditModal: Story = {
  render: args => {
    const { openTodoEditModal } = useModalStore();

    const mockTodo: Todo = {
      todoId: 1,
      goalId: 1,
      title: '수정할 할 일입니다',
      isDone: false,
      attachment: [
        {
          type: 'file',
          url: 'https://example.com/document.pdf',
          fileName: 'document.pdf',
          size: 1024000,
        },
        {
          type: 'link',
          url: 'https://github.com/example/repo',
          fileName: 'GitHub Repository',
        },
      ],
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      accumulatedMs: 0,
    };

    return (
      <>
        <button
          onClick={() => openTodoEditModal(mockTodo)}
          className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
        >
          할 일 수정 모달 열기
        </button>
        <TodoModal {...args} />
      </>
    );
  },
};

export const FormFeatureTest: Story = {
  render: args => {
    const { openTodoModal } = useModalStore();

    return (
      <>
        <button
          onClick={openTodoModal}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          폼 기능 테스트
        </button>
        <div className="mt-4 max-w-md text-sm text-gray-600">
          <p>
            <strong>테스트 시나리오:</strong>
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>빈 제목으로 저장 시도 (유효성 검증)</li>
            <li>목표 선택 없이 저장 시도</li>
            <li>첨부파일 추가/제거</li>
            <li>폼 수정 후 닫기 시도 (확인 다이얼로그)</li>
            <li>변경사항 추적 (hasChanges 로직)</li>
          </ul>
        </div>
        <TodoModal {...args} />
      </>
    );
  },
};
