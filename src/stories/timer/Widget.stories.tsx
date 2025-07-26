import type { Meta, StoryObj } from '@storybook/nextjs';

import TimerWidget from '@/components/timer/TimerWidget';
import { goalSummariesRes } from '@/mocks/mockResponses/goals/goalsResponse';

const meta: Meta<typeof TimerWidget> = {
  title: 'Components/timer/TimerWidget',
  component: TimerWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TimerWidget>;

export const Default: Story = {
  render: () => <TimerWidget goals={goalSummariesRes.goals} />,
};
