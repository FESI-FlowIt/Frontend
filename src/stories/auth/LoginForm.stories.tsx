import { Meta, StoryObj } from '@storybook/nextjs-vite';

import LoginForm from '@/components/auth/LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Components/auth/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};
