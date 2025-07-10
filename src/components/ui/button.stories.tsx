import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';

const meta = {
  title: 'Components/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: '버튼의 시각적 스타일을 결정합니다.',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: '버튼의 크기를 결정합니다.',
    },
    asChild: {
      control: 'boolean',
      description: '버튼을 자식 컴포넌트로 렌더링할지 여부를 결정합니다.',
    },
    children: {
      control: 'text',
      description: '버튼 내부에 표시될 내용입니다.',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Default Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'default',
    children: 'Destructive Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
    children: 'Outline Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'default',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'default',
    children: 'Ghost Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    size: 'default',
    children: 'Link Button',
  },
};
