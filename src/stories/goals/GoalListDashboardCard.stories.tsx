import type { Meta, StoryObj } from '@storybook/nextjs';

import GoalListDashboardCard from '@/components/goals/GoalListDashboardCard';
import { goalSummariesRes } from '@/mocks/mockResponses/goals/goalsResponse';

const meta: Meta<typeof GoalListDashboardCard> = {
  title: 'Components/goals/goallist/GoalListDashboardCard',
  component: GoalListDashboardCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GoalListDashboardCard>;

export const Default: Story = {
  args: {
    goal: goalSummariesRes[0],
  },
};

export const Emptygoals: Story = {
  args: {
    goal: null,
  },
};
export const NoTodos: Story = {
  args: {
    goal: {
      ...goalSummariesRes[1],
      todos: [],
    },
  },
};
