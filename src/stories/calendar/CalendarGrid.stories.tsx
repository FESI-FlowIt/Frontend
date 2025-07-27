import type { Meta, StoryObj } from '@storybook/nextjs';

import CalendarGrid from '@/components/calendar/CalendarGrid';
import { CalendarData } from '@/interfaces/calendar';

const meta = {
  title: 'Components/calendar/CalendarGrid',
  component: CalendarGrid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '월별 캘린더 그리드를 표시하는 컴포넌트입니다. 날짜별 목표를 시각화합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: '캘린더 데이터 (월과 목표 리스트)',
    },
  },
} satisfies Meta<typeof CalendarGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// 목표가 없는 기본 캘린더
export const Default: Story = {
  args: {
    data: {
      month: '2025-07',
      goals: [],
    } as CalendarData,
  },
};

// 몇 개의 목표가 있는 캘린더
export const WithGoals: Story = {
  args: {
    data: {
      month: '2025-07',
      goals: [
        {
          id: 'goal_1',
          title: '포트폴리오 완성하기',
          due_date: '2025-07-10',
          color: '#FF6B6B',
          created_at: '2024-07-10T09:00:00Z',
        },
        {
          id: 'goal_2',
          title: '블로그 작성',
          due_date: '2025-07-15',
          color: '#FFA94D',
          created_at: '2024-07-15T09:00:00Z',
        },
        {
          id: 'goal_3',
          title: '프로젝트 발표',
          due_date: '2025-07-20',
          color: '#5EDC8D',
          created_at: '2024-07-20T09:00:00Z',
        },
      ],
    } as CalendarData,
  },
};
