import { Meta, StoryObj } from '@storybook/nextjs-vite';

import LandingIntroduction from '@/components/landing/LandingIntroduction';

const meta: Meta<typeof LandingIntroduction> = {
  title: 'Components/landing/LandingIntroduction',
  component: LandingIntroduction,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LandingIntroduction>;

export const Default: Story = {};
