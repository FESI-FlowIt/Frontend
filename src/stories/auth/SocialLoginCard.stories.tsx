import { Meta, StoryObj } from '@storybook/nextjs-vite';

import SocialLoginCard from '@/components/auth/SocialLoginCard';

const meta: Meta<typeof SocialLoginCard> = {
  title: 'Components/auth/SocialLoginCard',
  component: SocialLoginCard,
};

export default meta;
type Story = StoryObj<typeof SocialLoginCard>;

export const Default: Story = {};
