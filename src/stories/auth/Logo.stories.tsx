import { Meta, StoryObj } from '@storybook/nextjs-vite';

import Logo from '@/components/auth/Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/auth/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    imgWidth: { control: 'number' },
    imgHeight: { control: 'number' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    children: 'FlowIt',
    imgWidth: 60,
    imgHeight: 60,
    className: 'text-[52px] font-bold text-[#1E2128]',
  },
};

export const Small: Story = {
  args: {
    children: 'FlowIt',
    imgWidth: 32,
    imgHeight: 32,
    className: 'text-xl font-semibold text-[#1E2128]',
  },
};

export const OnlyImg: Story = {
  args: {
    children: '',
    imgWidth: 66.67,
    imgHeight: 66.67,
    className: '',
  },
};
