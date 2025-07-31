import { useRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TimerIcon from '@/assets/icons/timer.svg';
import LegendSection from '@/components/heatmaps/LegendSection';
import Popover from '@/components/ui/Popover';
import { MONTHLY_LEGEND, WEEKLY_LEGEND } from '@/constants/heatmap';
import { hexToGoalColor } from '@/lib/calendar';

const meta: Meta<typeof Popover> = {
  title: 'Components/ui/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'variant 시스템을 지원하는 팝오버 컴포넌트입니다. heatmap과 calendar 두 가지 스타일을 제공합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      description: '팝오버 스타일 variant',
      control: 'select',
      options: ['heatmap', 'calendar'],
      table: {
        defaultValue: { summary: 'heatmap' },
      },
    },
    title: {
      description: '팝오버 상단에 표시할 제목',
      control: 'text',
    },
    icon: {
      description: '제목 왼쪽에 표시할 아이콘 (heatmap variant에서만 사용)',
      control: false,
    },
    children: {
      description: '팝오버 본문 내용',
      control: false,
    },
    onClose: {
      description: '닫기 버튼 클릭 시 호출되는 콜백',
      action: 'closed',
    },
    isOpen: {
      table: { disable: true },
    },
    position: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

// 기본 히트맵 팝오버
export const HeatmapDefault: Story = {
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
      <div style={{ padding: '120px' }}>
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="bg-primary-01 rounded-8 px-12 py-6 text-white"
        >
          히트맵 팝오버 열기
        </button>

        <Popover
          isOpen={isOpen}
          position={position}
          title="기본 히트맵 팝오버"
          variant="heatmap"
          onClose={() => setIsOpen(false)}
          icon={<TimerIcon className="text-gray-01" width={24} height={24} fill="currentColor" />}
        >
          <div className="flex flex-row gap-76">
            <LegendSection title="[주간]" data={WEEKLY_LEGEND} />
            <LegendSection title="[월간]" data={MONTHLY_LEGEND} />
          </div>
        </Popover>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'heatmap variant를 사용한 기본 팝오버입니다. 고정된 width, height을 가집니다.',
      },
    },
  },
};

// 캘린더 팝오버
export const CalendarPopover: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX - 100, // 중앙 정렬을 위해 조정
        });
        setIsOpen(true);
      }
    };

    const singleGoal = [{ id: '1', title: '여름 휴가 계획', color: '#FF6B6B' }];

    return (
      <div style={{ padding: '120px' }}>
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="bg-secondary-01 rounded-8 px-12 py-6 text-white"
        >
          캘린더 팝오버 열기
        </button>

        <Popover
          isOpen={isOpen}
          position={position}
          title="7월 14일 마감"
          variant="calendar"
          onClose={() => setIsOpen(false)}
        >
          <div className="flex flex-col">
            {singleGoal.map(goal => (
              <div
                key={goal.id}
                className="hover:bg-tertiary-01-press flex h-52 cursor-pointer items-center gap-20 px-20"
              >
                <div
                  className={`h-12 w-12 flex-shrink-0 rounded-full bg-goal-${hexToGoalColor(goal.color)}`}
                />
                <span className="text-text-02 text-body-m-20 flex-1">{goal.title}</span>
              </div>
            ))}
          </div>
        </Popover>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'calendar variant를 사용한 목표 리스트 팝오버입니다. 고정된 width를 가지며, height은 목표 리스트의 개수에 따라 달라집니다.',
      },
    },
  },
};
