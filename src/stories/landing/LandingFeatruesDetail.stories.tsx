import { Meta, StoryObj } from '@storybook/nextjs-vite';

import LandingFeaturesDetail from '@/components/landing/LandingFeaturesDetail';

const meta: Meta<typeof LandingFeaturesDetail> = {
  title: 'Components/landing/LandingFeaturesDetail',
  component: LandingFeaturesDetail,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LandingFeaturesDetail>;

export const Default: Story = {};
