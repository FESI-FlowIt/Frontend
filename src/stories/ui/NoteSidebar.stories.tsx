import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import NoteSidebar from '@/components/ui/NoteSidebar/NoteSidebar';
import { TodoWithNotes } from '@/interfaces/todo';

const mockTodoWithNotes: TodoWithNotes = {
  todoId: 1,
  title: '자바스크립트 기초 렌더링 통과',
  isDone: false,
  goalId: 1,
  goalTitle: '프론트엔드 개발자 되기',
  notes: [
    {
      noteId: 1,
      todoId: 1,
      title: '자바스크립트 기초 정리',
      updatedAt: '2024-01-15T10:30:00.000Z',
    },
    {
      noteId: 2,
      todoId: 1,
      title: 'DOM 조작 실습',
      updatedAt: '2024-01-16T14:20:00.000Z',
    },
  ],
};

const meta: Meta<typeof NoteSidebar> = {
  title: 'Components/ui/NoteSidebar',
  component: NoteSidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NoteSidebar>;

const queryClient = new QueryClient();

// 3. 편집모드 - 인터랙티브 데모 (읽기→편집 전환 가능)
export const FullFlow: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <QueryClientProvider client={queryClient}>
        <div className="relative h-screen w-full bg-gray-100">
          <div className="p-24">
            <h3 className="mb-16 text-lg font-semibold">편집모드 테스트</h3>
            <p className="mb-12 text-sm text-gray-600">
              노트 상세에서 수정하기 버튼을 클릭하면 편집 모드로 전환됩니다.
            </p>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg bg-blue-500 px-16 py-8 text-white hover:bg-blue-600"
            >
              {isOpen ? '사이드바 닫기' : '사이드바 열기'}
            </button>
          </div>

          <NoteSidebar
            isOpen={isOpen}
            todo={mockTodoWithNotes}
            goalTitle="프론트엔드 개발자 되기"
            onClose={() => setIsOpen(false)}
          />
        </div>
      </QueryClientProvider>
    );
  },
};
