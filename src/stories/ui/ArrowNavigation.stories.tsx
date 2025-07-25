import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ArrowNavigation from '@/components/ui/ArrowNavigation';

const meta: Meta<typeof ArrowNavigation> = {
  title: 'Components/ui/ArrowNavigation',
  component: ArrowNavigation,
  tags: ['autodocs'],
  argTypes: {
    onPrev: { action: 'clicked prev' },
    onNext: { action: 'clicked next' },
  },
};

export default meta;
type Story = StoryObj<typeof ArrowNavigation>;

export const Default: Story = {
  args: {
    label: '2025년 7월',
  },
};

export const DisabledPrev: Story = {
  args: {
    label: '2025년 7월',
    isDisabledPrev: true,
  },
};

export const DisabledNext: Story = {
  args: {
    label: '2025년 7월',
    isDisabledNext: true,
  },
};

export const BothDisabled: Story = {
  args: {
    label: '2025년 7월',
    isDisabledPrev: true,
    isDisabledNext: true,
  },
};
