import { useRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import DropdownMenu from '@/components/ui/DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/ui/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '드롭다운 메뉴 컴포넌트입니다. 트리거 요소를 기준으로 다양한 위치에 표시할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'auto', 'goalListFilter', 'todo', 'full'],
    },
    animation: {
      control: { type: 'select' },
      options: ['none', 'fade', 'slide', 'scale'],
    },
    shadow: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    position: {
      control: { type: 'select' },
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
    },
    matchTriggerWidth: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
      <div className="relative flex min-h-[200px] w-full items-start justify-center pt-10">
        <div className="relative">
          <button
            ref={triggerRef}
            onClick={() => setIsOpen(!isOpen)}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            메뉴 열기
          </button>
          <DropdownMenu
            {...args}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            triggerRef={triggerRef}
          >
            <div className="py-2">
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100">수정</button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100">삭제</button>
            </div>
          </DropdownMenu>
        </div>
      </div>
    );
  },
};

export const ExampleByLocation: Story = {
  render: () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const bottomStartRef = useRef<HTMLButtonElement>(null);
    const bottomEndRef = useRef<HTMLButtonElement>(null);
    const topStartRef = useRef<HTMLButtonElement>(null);
    const topEndRef = useRef<HTMLButtonElement>(null);

    return (
      <div className="relative min-h-[400px] w-full p-20">
        <div className="grid h-full grid-cols-2 gap-20">
          {/* 위쪽 버튼들 */}
          <div className="flex items-start justify-center">
            <div className="relative">
              <button
                ref={topStartRef}
                onClick={() => setOpenMenu(openMenu === 'top-start' ? null : 'top-start')}
                className="w-200 rounded bg-purple-500 px-4 py-2 text-white"
              >
                위쪽 시작
              </button>
              <DropdownMenu
                isOpen={openMenu === 'top-start'}
                onClose={() => setOpenMenu(null)}
                triggerRef={topStartRef}
                position="top-start"
              >
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">옵션 1</button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">옵션 2</button>
                </div>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-start justify-center">
            <div className="relative">
              <button
                ref={topEndRef}
                onClick={() => setOpenMenu(openMenu === 'top-end' ? null : 'top-end')}
                className="w-200 rounded bg-indigo-500 px-4 py-2 text-white"
              >
                위쪽 끝
              </button>
              <DropdownMenu
                isOpen={openMenu === 'top-end'}
                onClose={() => setOpenMenu(null)}
                triggerRef={topEndRef}
                position="top-end"
              >
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">설정</button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">도움말</button>
                </div>
              </DropdownMenu>
            </div>
          </div>

          {/* 아래쪽 버튼들 */}
          <div className="flex items-end justify-center">
            <div className="relative">
              <button
                ref={bottomStartRef}
                onClick={() => setOpenMenu(openMenu === 'bottom-start' ? null : 'bottom-start')}
                className="w-200 rounded bg-blue-500 px-4 py-2 text-white"
              >
                아래쪽 시작
              </button>
              <DropdownMenu
                isOpen={openMenu === 'bottom-start'}
                onClose={() => setOpenMenu(null)}
                triggerRef={bottomStartRef}
                position="bottom-start"
              >
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">수정</button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">삭제</button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">공유</button>
                </div>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-end justify-center">
            <div className="relative">
              <button
                ref={bottomEndRef}
                onClick={() => setOpenMenu(openMenu === 'bottom-end' ? null : 'bottom-end')}
                className="w-200 rounded bg-green-500 px-4 py-2 text-white"
              >
                아래쪽 끝
              </button>
              <DropdownMenu
                isOpen={openMenu === 'bottom-end'}
                onClose={() => setOpenMenu(null)}
                triggerRef={bottomEndRef}
                position="bottom-end"
              >
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">프로필</button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">로그아웃</button>
                </div>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
