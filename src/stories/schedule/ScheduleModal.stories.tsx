import type { Meta, StoryObj } from '@storybook/react';

import ScheduleModal from '@/components/schedule/ScheduleModal';

const meta: Meta<typeof ScheduleModal> = {
  title: 'Schedule/ScheduleModal',
  component: ScheduleModal,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ScheduleModal>;

export const Default: Story = {
  render: () => <ScheduleModal isOpen={true} onClose={() => alert('모달 닫힘')} />,
};
