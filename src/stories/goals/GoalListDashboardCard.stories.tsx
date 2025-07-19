import type { Meta, StoryObj } from '@storybook/react';
import GoalListDashboardCard from '@/components/goals/GoalListDashboardCard';
import { goalSummariesRes } from '@/mocks/mockResponses/goals/goalsResponse';

const meta: Meta<typeof GoalListDashboardCard> = {
  title: 'components/goals/goallist/GoalListDashboardCard',
  component: GoalListDashboardCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GoalListDashboardCard>;

export const 기본: Story = {
  args: {
    goal: goalSummariesRes[0],
  },
};

export const 빈카드: Story = {
  args: {
    goal: null,
  },
};
