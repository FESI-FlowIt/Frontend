import { Meta, StoryObj } from '@storybook/nextjs-vite';

import SignUpForm from '@/components/auth/SignUpForm';

const meta: Meta<typeof SignUpForm> = {
  title: 'Components/auth/SignUpForm',
  component: SignUpForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {};
