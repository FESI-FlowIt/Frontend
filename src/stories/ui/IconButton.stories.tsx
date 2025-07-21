import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconButton } from '@/components/ui/IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/ui/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: '아이콘 종류 (info, close)',
      control: 'select',
      options: ['info', 'close'],
    },
    'aria-label': {
      description: '스크린 리더를 위한 접근성 라벨',
      control: 'text',
    },
    onClick: {
      description: '클릭 시 발생하는 이벤트 핸들러',
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    variant: 'close',
    'aria-label': '닫기',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    'aria-label': '정보 보기',
  },
};
