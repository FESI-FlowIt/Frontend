import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ScheduleSection from '@/components/schedule/ScheduleSection';

const meta: Meta<typeof ScheduleSection> = {
  title: 'Components/schedule/SimpleScheduleCard',
  component: ScheduleSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ScheduleSection>;

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
