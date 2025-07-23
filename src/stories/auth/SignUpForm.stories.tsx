import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import SignUpForm from '@/components/auth/SignUpForm';

const meta: Meta<typeof SignUpForm> = {
  title: 'Components/auth/SignUpForm',
  component: SignUpForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <QueryClientProvider client={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {};
