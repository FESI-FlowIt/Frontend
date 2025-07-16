import { Meta, StoryObj } from '@storybook/nextjs-vite';

import Logo from '@/components/auth/Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/auth/Logo',
  component: Logo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {};
