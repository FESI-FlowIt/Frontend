import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from '@/components/ui/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/ui/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
    },
    inputSize: {
      control: 'select',
      options: ['default'],
    },
    text: {
      control: 'select',
      options: ['default'],
    },
  },
  args: {
    placeholder: '아이디',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    variant: 'default',
    inputSize: 'default',
    text: 'default',
  },
};
