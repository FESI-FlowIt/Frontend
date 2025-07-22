import { useRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import HeatmapInfoPopover from '@/components/heatmaps/HeatmapInfoPopover';

const meta: Meta<typeof HeatmapInfoPopover> = {
  title: 'Components/heatmap/HeatmapInfoPopover',
  component: HeatmapInfoPopover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '히트맵 우측 상단에 위치한 정보 툴팁 버튼입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeatmapInfoPopover>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX,
        });
        setIsOpen(true);
      }
    };

    return (
      <div className="p-120">
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="rounded-8 bg-primary-01 px-12 py-6 text-white"
        >
          히트맵 정보 보기
        </button>

        {isOpen && <HeatmapInfoPopover onClose={() => setIsOpen(false)} position={position} />}
      </div>
    );
  },
};
