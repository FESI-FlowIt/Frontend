import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/nextjs-vite';

import Tab from '@/components/ui/Tab';

const meta: Meta<typeof Tab> = {
  title: 'Components/ui/Tab',
  component: Tab,
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: '탭 아이템 배열 { id: string, label: string }[]',
    },
    value: {
      description: '현재 선택된 탭 ID',
    },
    onChange: {
      description: '탭 변경 콜백',
      action: 'changed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tab>;

// 기본 사용
export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('week');

    return (
      <Tab
        items={[
          { id: 'week', label: '이번 주' },
          { id: 'month', label: '이번 달' },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />
    );
  },
};

// 여러 탭
export const MultipleTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('all');

    return (
      <Tab
        items={[
          { id: 'all', label: '전체' },
          { id: 'active', label: '활성' },
          { id: 'completed', label: '완료' },
          { id: 'archived', label: '보관' },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />
    );
  },
};

// 제어 컴포넌트 (외부 상태와 연동)
export const WithExternalControl: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('design');

    return (
      <div className="space-y-16">
        <Tab
          items={[
            { id: 'design', label: '디자인' },
            { id: 'development', label: '개발' },
            { id: 'testing', label: '테스트' },
          ]}
          value={activeTab}
          onChange={setActiveTab}
        />

        <div className="text-body-m-12 text-text-03">현재 선택: {activeTab}</div>

        <div className="space-x-8">
          <button
            onClick={() => setActiveTab('design')}
            className="bg-primary-01 rounded-8 text-12 px-12 py-6 text-white"
          >
            디자인 선택
          </button>
          <button
            onClick={() => setActiveTab('development')}
            className="bg-primary-01 rounded-8 text-12 px-12 py-6 text-white"
          >
            개발 선택
          </button>
          <button
            onClick={() => setActiveTab('testing')}
            className="bg-primary-01 rounded-8 text-12 px-12 py-6 text-white"
          >
            테스트 선택
          </button>
        </div>
      </div>
    );
  },
};
