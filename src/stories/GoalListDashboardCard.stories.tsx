import type { Meta, StoryObj } from '@storybook/react';
import GoalListDashboardCard from '../components/goals/goallist/GoalListDashboardCard';
import { mockGoalSummaries } from '@/mocks/data/mockGoalSummaries';

const meta: Meta<typeof GoalListDashboardCard> = {
  title: 'components/goals/goallist/GoalListDashboardCard',
  component: GoalListDashboardCard,
};

export default meta;

type Story = StoryObj<typeof GoalListDashboardCard>;

export const 기본: Story = {
  args: {
    goal: mockGoalSummaries[0],
  },
};

export const 빈카드: Story = {
  args: {
    goal: null,
  },
};
