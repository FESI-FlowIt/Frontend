import { useRef, useState } from 'react';

import Image from 'next/image';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconButton } from '@/components/ui/IconButton';
import Popover from '@/components/ui/Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/ui/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: '팝오버 상단에 표시할 제목',
      control: 'text',
    },
    icon: {
      description: '제목 왼쪽에 표시할 아이콘 (선택)',
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

// 기본 팝오버
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
      <div style={{ padding: '120px' }}>
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="bg-primary-01 rounded-8 px-12 py-6 text-white"
        >
          팝오버 열기
        </button>

        <Popover
          isOpen={isOpen}
          position={position}
          title="기본 팝오버"
          onClose={() => setIsOpen(false)}
        >
          <div className="text-body-m-16 text-text-03">
            버튼을 클릭하면 나타나는 기본 팝오버입니다.
          </div>
        </Popover>
      </div>
    );
  },
};

// 아이콘 포함 팝오버
export const WithIcon: Story = {
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
        <IconButton ref={buttonRef} variant="info" aria-label="팝오버 열기" onClick={handleClick} />

        <Popover
          isOpen={isOpen}
          position={position}
          title="작업 시간 분석"
          icon={
            <Image
              src="/assets/icons/timerIcon.svg"
              alt="타이머 아이콘"
              width={24}
              height={24}
              className="text-gray-01"
            />
          }
          onClose={() => setIsOpen(false)}
        >
          <div className="text-body-m-16 text-text-03">
            아이콘이 포함된 팝오버입니다. 작업 시간 정보를 시각적으로 보여줍니다.
          </div>
        </Popover>
      </div>
    );
  },
};
