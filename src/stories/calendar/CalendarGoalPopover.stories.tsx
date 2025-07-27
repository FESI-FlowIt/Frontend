import { useRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import CalendarGoalPopover from '@/components/calendar/CalendarGoalPopover';
import { calendar202507Res } from '@/mocks/mockResponses/calendar/calendarResponse';

const meta: Meta<typeof CalendarGoalPopover> = {
  title: 'Components/calendar/CalendarGoalPopover',
  component: CalendarGoalPopover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '캘린더 날짜 클릭 시 해당 날짜의 목표 리스트를 보여주는 팝오버입니다.',
      },
    },
  },
  argTypes: {
    month: {
      description: '목표 마감 월',
      control: { type: 'number', min: 1, max: 12 },
    },
    date: {
      description: '목표 마감 일',
      control: { type: 'number', min: 1, max: 31 },
    },
    goals: {
      description: '해당 날짜의 목표 리스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarGoalPopover>;

// Mock 데이터에서 목표 추출 및 날짜별 그룹핑
const july10Goals = calendar202507Res.data.goals.filter(goal => goal.due_date === '2025-07-10');
const july14Goals = calendar202507Res.data.goals.filter(goal => goal.due_date === '2025-07-14');

export const July10Goals: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX - 100,
        });
        setIsOpen(true);
      }
    };

    return (
      <div className="p-120">
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="rounded-8 bg-black px-12 py-6 text-white"
        >
          7월 10일 목표 보기 ({july10Goals.length}개)
        </button>

        <CalendarGoalPopover
          month={7}
          date={10}
          goals={july10Goals}
          position={position}
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '7월 10일에 마감되는 목표들을 보여줍니다. (포트폴리오 완성하기, 블로그 오픈하기)',
      },
    },
  },
};

export const July14ManyGoals: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX - 100,
        });
        setIsOpen(true);
      }
    };

    return (
      <div className="p-120">
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="rounded-8 bg-black px-12 py-6 text-white"
        >
          7월 14일 목표 보기 ({july14Goals.length}개)
        </button>

        <CalendarGoalPopover
          month={7}
          date={14}
          goals={july14Goals}
          position={position}
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '7월 14일에 마감되는 많은 목표들을 보여줍니다. (5개의 다양한 목표들)',
      },
    },
  },
};
