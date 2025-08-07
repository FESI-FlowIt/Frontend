import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MOCK_TODOS_WITH_NOTES } from '@/components/notes/constants';
import NoteSidebar from '@/components/ui/NoteSidebar/NoteSidebar';

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

// 3. 편집모드 - 인터랙티브 데모 (읽기→편집 전환 가능)
export const FullFlow: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const selectedNote = MOCK_TODOS_WITH_NOTES[0].notes[0];

    return (
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
          todo={MOCK_TODOS_WITH_NOTES[0]}
          selectedNote={selectedNote}
          goalTitle="프론트엔드 개발자 되기"
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
};
