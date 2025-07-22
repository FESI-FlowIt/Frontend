import type { Meta, StoryObj } from '@storybook/nextjs';
import TimerWidget from '@/components/timer/TimerWidget';

import { goalSummariesRes } from '@/mocks/mockResponses/goals/goalsResponse'; // ✅ 경로 정확히 확인

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
  render: () => <TimerWidget goals={goalSummariesRes} />, // ✅ mockGoals 전달
};
