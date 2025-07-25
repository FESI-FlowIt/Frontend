import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import MonthlyHeatmap from '@/components/heatmaps/MonthlyHeatmap';
import { monthlyHeatmapRes } from '@/mocks/mockResponses/heatmap/monthlyHeatmapResponse';

const meta: Meta<typeof MonthlyHeatmap> = {
  title: 'Components/heatmap/MonthlyHeatmap',
  component: MonthlyHeatmap,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: false,
      description: '월간 히트맵 데이터',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '주차 단위로 구성된 월간 히트맵 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MonthlyHeatmap>;

export const Default: Story = {
  args: {
    data: monthlyHeatmapRes.data,
  },
};
