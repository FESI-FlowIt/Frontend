import { Meta, StoryObj } from '@storybook/nextjs-vite';

import LandingBanner from '@/components/landing/LandingBanner';

const meta: Meta<typeof LandingBanner> = {
  title: 'Components/landing/LandingBanner',
  component: LandingBanner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LandingBanner>;

export const Default: Story = {};
