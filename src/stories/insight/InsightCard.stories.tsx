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
    item: '이번 주 골든 타임 1회 달성!',
  },
};

export const Monthly: Story = {
  args: {
    variant: 'monthly',
    item: '이번 달은 1주 차를 열심히 보냈네요!',
  },
};
