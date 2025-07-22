import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import WeeklyHeatmap from '@/components/heatmaps/WeeklyHeatmap';
import { weeklyHeatmapRes } from '@/mocks/mockResponses/heatmap/weeklyHeatmapResponse';

const meta: Meta<typeof WeeklyHeatmap> = {
  title: 'Components/heatmap/WeeklyHeatmap',
  component: WeeklyHeatmap,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: false,
      description: '주간 히트맵 데이터',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '요일 단위로 구성된 주간 히트맵 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WeeklyHeatmap>;

export const Default: Story = {
  args: {
    data: weeklyHeatmapRes.data,
  },
};
