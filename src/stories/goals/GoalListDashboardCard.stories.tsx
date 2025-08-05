import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GoalListDashboardCard from '@/components/goals/GoalListDashboardCard';
import { goalSummariesRes } from '@/mocks/mockResponses/goals/goalsResponse';

const queryClient = new QueryClient();

const meta: Meta<typeof GoalListDashboardCard> = {
  title: 'Components/goals/GoalListDashboardCard',
  component: GoalListDashboardCard,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof GoalListDashboardCard>;

export const Default: Story = {
  args: {
    goal: goalSummariesRes.goals[0],
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
      ...goalSummariesRes.goals[1],
      todos: [],
    },
  },
};
