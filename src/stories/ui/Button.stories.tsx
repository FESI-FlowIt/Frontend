import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/components/ui/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/ui/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary'],
    },
    text: {
      control: 'select',
      options: ['default', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['auth', 'check', 'modal'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'default'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '로그인',
    variant: 'default',
    text: 'default',
    size: 'auth',
    rounded: 'default',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    children: '확인',
    variant: 'secondary',
    text: 'secondary',
    size: 'check',
    rounded: 'default',
    disabled: false,
  },
};

export const Disable: Story = {
  args: {
    children: '로그인',
    size: 'auth',
    rounded: 'default',
    disabled: true,
  },
};

export const Icon: Story = {
  args: {
    icon: <span>🚀</span>,
    children: 'Icon Button',
  },
};
