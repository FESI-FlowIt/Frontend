import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['pin', 'trash', 'edit', 'check', 'circle', 'more'],
      description: '표시할 아이콘의 이름을 선택합니다.',
    },
    size: {
      control: 'number',
      description: '아이콘의 크기를 픽셀 단위로 설정합니다.',
    },
    color: {
      control: 'color',
      description: '아이콘의 색상을 설정합니다.',
    },
    strokeWidth: {
      control: 'number',
      description: '아이콘 선의 두께를 설정합니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const PinIcon: Story = {
  args: {
    name: 'pin',
    size: 24,
    color: '#333',
  },
};

export const TrashIcon: Story = {
  args: {
    name: 'trash',
    size: 24,
    color: '#FF4D4D',
  },
};

export const EditIcon: Story = {
  args: {
    name: 'edit',
    size: 24,
    color: '#1890FF',
  },
};

export const CheckIcon: Story = {
  args: {
    name: 'check',
    size: 24,
    color: '#52C41A',
  },
};

export const CircleIcon: Story = {
  args: {
    name: 'circle',
    size: 24,
    color: '#BFBFBF',
  },
};

export const MoreIcon: Story = {
  args: {
    name: 'more',
    size: 24,
    color: '#333',
  },
};

export const MoreVerticalIcon: Story = {
  args: {
    name: 'more-vertical',
    size: 24,
    color: '#333',
  },
};
