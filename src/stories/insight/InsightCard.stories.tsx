import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import InsightCard from '@/components/insight/InsightCard';

const meta: Meta<typeof InsightCard> = {
  title: 'Components/Insight/InsightCard',
  component: InsightCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['no-data', 'weekly', 'monthly'],
      description: '카드 타입 (no-data, weekly, monthly)',
    },
    className: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '인사이트 카드 컴포넌트입니다. 주간/월간 또는 데이터 없음 상태에 따라 콘텐츠를 렌더링합니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InsightCard>;

export const NoData: Story = {
  args: {
    variant: 'no-data',
  },
};

export const Weekly: Story = {
  args: {
    variant: 'weekly',
    items: ['아침 시간대의 집중력이 높아요.', '목표 3개 중 2개를 성공적으로 달성했어요.'],
  },
};

export const Monthly: Story = {
  args: {
    variant: 'monthly',
    items: [
      '가장 많이 활동한 요일은 화요일이에요.',
      '전체 목표 달성률은 85%입니다.',
      '작업 시간은 평균 3.2시간으로 꾸준했어요.',
    ],
  },
};
