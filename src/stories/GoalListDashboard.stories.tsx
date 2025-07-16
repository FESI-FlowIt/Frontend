import type { Meta, StoryObj } from '@storybook/react';
import GoalListDashboard from '../components/goals/goallist/GoalListDashboard';

const meta: Meta<typeof GoalListDashboard> = {
  title: 'components/goals/goallist/GoalListDashboard',
  component: GoalListDashboard,
};

export default meta;
type Story = StoryObj<typeof GoalListDashboard>;

export const 기본: Story = {};
