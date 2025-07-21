import type { Meta, StoryObj } from '@storybook/nextjs';
import TimerWidget from '@/components/timer/TimerWidget';
import { mockGoals } from '@/mocks/mockResponses/timer/timerResponse'; // ✅ 경로 정확히 확인

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
  render: () => <TimerWidget goals={mockGoals} />, // ✅ mockGoals 전달
};
