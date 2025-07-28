import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ScheduleModal from '@/components/schedule/ScheduleModal';

const meta: Meta<typeof ScheduleModal> = {
  title: 'Components/schedule/ScheduleModal',
  component: ScheduleModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    isOpen: true,
    onClose: () => {},
    assignedTasks: [],
    setAssignedTasks: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof ScheduleModal>;

export const Default: Story = {};
