import { Meta, StoryObj } from '@storybook/nextjs-vite';

import AuthModal from '@/components/auth/AuthModal';

const meta: Meta<typeof AuthModal> = {
  title: 'Components/auth/AuthModal',
  component: AuthModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AuthModal>;

export const LoginFail: Story = {
  args: {
    isOpen: true,
    closeModal: () => alert('closeModal called'),
    mode: 'login',
  },
};

export const SignupFail: Story = {
  args: {
    isOpen: true,
    closeModal: () => alert('closeModal called'),
    mode: 'signup',
  },
};
