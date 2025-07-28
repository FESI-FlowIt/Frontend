import { Meta, StoryObj } from '@storybook/nextjs-vite';

import CustomLoading from '@/components/ui/CustomLoading';

const meta: Meta<typeof CustomLoading> = {
  title: 'Components/ui/CustomLoading',
  component: CustomLoading,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof CustomLoading>;

export const Default: Story = {
  render: () => <CustomLoading />,
};
