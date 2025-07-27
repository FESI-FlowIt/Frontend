import type { Meta, StoryObj } from '@storybook/nextjs';

import CalendarCell from '@/components/calendar/CalendarCell';

const meta = {
  title: 'Components/calendar/CalendarCell',
  component: CalendarCell,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: { type: 'number', min: 1, max: 31 },
      description: '캘린더 셀에 표시될 날짜',
    },
    goals: {
      control: 'object',
      description: '해당 날짜의 목표 리스트 (첫 번째 목표만 표시됨)',
    },
    onClick: {
      action: 'clicked',
      description: '셀 클릭 시 호출되는 함수',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof CalendarCell>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (목표 없음)
export const Default: Story = {
  args: {
    date: 15,
    goals: [],
  },
};

// 목표가 있는 스토리
export const WithGoal: Story = {
  args: {
    date: 10,
    goals: [
      {
        id: 'goal_1',
        title: '포트폴리오 완성하기',
        due_date: '2025-07-10',
        color: '#FF6B6B',
        created_at: '2024-07-10T09:00:00Z',
      },
    ],
  },
};
