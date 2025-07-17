import { Meta, StoryObj } from '@storybook/nextjs-vite';

import SocialLoginCard from '@/components/auth/SocialLoginCard';

const meta: Meta<typeof SocialLoginCard> = {
  title: 'Components/auth/SocialLoginCard',
  component: SocialLoginCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SocialLoginCard>;

export const Login: Story = {
  args: {
    mode: 'login',
  },
};

export const SignUp: Story = {
  args: {
    mode: 'signUp',
  },
};
