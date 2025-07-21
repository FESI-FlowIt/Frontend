import type { Meta, StoryObj } from '@storybook/nextjs';
import TimerWidget from '@/components/timer/TimerWidget';

const meta: Meta<typeof TimerWidget> = {
  title: 'Components/timer/TimerWidget',
  component: TimerWidget,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof TimerWidget>;

export const Default: Story = {
  render: () => <TimerWidget />,
};
