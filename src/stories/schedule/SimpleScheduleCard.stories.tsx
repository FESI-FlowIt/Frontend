import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SimpleScheduleCard from '@/components/schedule/SimpleScheduleCard';

const meta: Meta<typeof SimpleScheduleCard> = {
  title: 'Components/Schedule/SimpleScheduleCard',
  component: SimpleScheduleCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SimpleScheduleCard>;

export const Default: Story = {
  args: {
    date: '7월 9일',
    items: [
      { time: '10:00', content: '회의 준비' },
      { time: '14:00', content: '프론트엔드 구현' },
      { time: '18:00', content: '팀 회의' },
    ],
    onManageClick: () => alert('일정 관리 클릭'),
  },
};
