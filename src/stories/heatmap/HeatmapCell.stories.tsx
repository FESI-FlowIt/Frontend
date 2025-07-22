import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import HeatmapCell from '@/components/heatmaps/HeatmapCell';
import { WEEKLY_LEGEND } from '@/constants/heatmap';
import type { HeatmapIntensity } from '@/interfaces/heatmap';

const meta: Meta<typeof HeatmapCell> = {
  title: 'Components/heatmap/HeatmapCell',
  component: HeatmapCell,
  tags: ['autodocs'],
  argTypes: {
    intensity: {
      control: 'number',
      description: '강도 (0~4)',
      defaultValue: 2,
    },
    minutes: {
      control: 'number',
      description: '작업 시간 (분)',
      defaultValue: 90,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '히트맵 셀 단위 컴포넌트입니다. 시간과 강도에 따라 배경색이 디바이스 크기별로 다르게 보여집니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeatmapCell>;

export const Default: Story = {
  args: {
    intensity: 3,
    minutes: 180,
  },
};

export const ByIntensityLegend: Story = {
  render: () => (
    <div className="flex flex-wrap gap-24 p-24">
      {WEEKLY_LEGEND.map(({ intensity, label }) => {
        const minutes = intensity * 60;

        return (
          <div key={intensity} className="flex flex-col items-center gap-4">
            <HeatmapCell intensity={intensity as HeatmapIntensity} minutes={minutes} />
            <div className="text-caption-m-12 text-text-03">{label}</div>
          </div>
        );
      })}
    </div>
  ),
};
