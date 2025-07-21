import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Dialog from '@/components/ui/Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/ui/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CVA 기반의 다이얼로그 컴포넌트. 확인/알림 용도로 사용되며 Portal을 통해 렌더링됩니다.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['default'],
      description: '다이얼로그 크기',
    },
    padding: {
      control: { type: 'select' },
      options: ['default'],
      description: '내부 패딩',
    },
    margin: {
      control: { type: 'select' },
      options: ['default'],
      description: '외부 마진',
    },
    rounded: {
      control: { type: 'select' },
      options: ['default', 'none'],
      description: '모서리 둥글기',
    },
    animation: {
      control: { type: 'select' },
      options: ['none'],
      description: '애니메이션 효과',
    },
    overlay: {
      control: { type: 'select' },
      options: ['default', 'dark', 'light'],
      description: '오버레이 배경',
    },
    closeOnOverlayClick: {
      control: { type: 'boolean' },
      description: '오버레이 클릭으로 닫기',
    },
    closeOnEscape: {
      control: { type: 'boolean' },
      description: 'ESC 키로 닫기',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const DialogWithHooks = (args: Story['args']) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-500 px-16 py-8 text-white transition-colors hover:bg-blue-600"
      >
        다이얼로그 열기
      </button>
      <Dialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children}
      </Dialog>
    </>
  );
};

// 기본 다이얼로그
export const Default: Story = {
  render: DialogWithHooks,
  args: {
    children: (
      <div className="flex h-full flex-col text-center">
        <div className="mb-24">
          <h2 className="text-display-20 text-text-01 font-bold">기본 다이얼로그</h2>
        </div>
        <div className="mb-24 flex flex-1 items-center justify-center">
          <p className="text-body-m-16 text-text-02">이것은 기본 스타일의 다이얼로그입니다.</p>
        </div>
        <div className="flex justify-center">
          <button className="min-w-80 rounded-lg bg-blue-500 px-20 py-8 text-white hover:bg-blue-600">
            확인
          </button>
        </div>
      </div>
    ),
  },
};

// 확인 다이얼로그
export const ConfirmDialog: Story = {
  render: DialogWithHooks,
  args: {
    children: (
      <div className="flex h-full flex-col text-center">
        <div className="mb-24">
          <h2 className="text-display-20 text-text-01 font-bold">잠깐!</h2>
        </div>
        <div className="mb-24 flex flex-1 items-center justify-center">
          <p className="text-body-m-16 text-text-02 leading-relaxed">
            정말 나가시겠어요?
            <br />
            작성된 내용이 모두 사라집니다.
          </p>
        </div>
        <div className="flex justify-center gap-12">
          <button className="min-w-80 rounded-lg bg-gray-200 px-20 py-8 text-gray-700 hover:bg-gray-300">
            취소
          </button>
          <button className="min-w-80 rounded-lg bg-blue-500 px-20 py-8 text-white hover:bg-blue-600">
            확인
          </button>
        </div>
      </div>
    ),
    closeOnOverlayClick: false,
    closeOnEscape: false,
  },
};

// 알림 다이얼로그
export const AlertDialog: Story = {
  render: DialogWithHooks,
  args: {
    children: (
      <div className="flex h-full flex-col text-center">
        <div className="mb-16">
          <div className="text-32 mb-8">✅</div>
          <h2 className="text-display-20 text-text-01 font-bold">성공!</h2>
        </div>
        <div className="mb-24 flex flex-1 items-center justify-center">
          <p className="text-body-m-16 text-text-02">작업이 성공적으로 완료되었습니다.</p>
        </div>
        <div className="flex justify-center">
          <button className="min-w-80 rounded-lg bg-green-500 px-20 py-8 text-white hover:bg-green-600">
            확인
          </button>
        </div>
      </div>
    ),
  },
};

// 에러 다이얼로그
export const ErrorDialog: Story = {
  render: DialogWithHooks,
  args: {
    children: (
      <div className="flex h-full flex-col text-center">
        <div className="mb-16">
          <div className="text-32 mb-8">❌</div>
          <h2 className="text-display-20 text-text-01 font-bold">오류 발생</h2>
        </div>
        <div className="mb-24 flex flex-1 items-center justify-center">
          <p className="text-body-m-16 text-text-02">
            요청을 처리하는 중 오류가 발생했습니다.
            <br />
            다시 시도해 주세요.
          </p>
        </div>
        <div className="flex justify-center">
          <button className="min-w-80 rounded-lg bg-red-500 px-20 py-8 text-white hover:bg-red-600">
            확인
          </button>
        </div>
      </div>
    ),
    overlay: 'dark',
  },
};

// 경고 다이얼로그
export const WarningDialog: Story = {
  render: DialogWithHooks,
  args: {
    children: (
      <div className="flex h-full flex-col text-center">
        <div className="mb-16">
          <div className="text-32 mb-8">⚠️</div>
          <h2 className="text-display-20 text-text-01 font-bold">주의</h2>
        </div>
        <div className="mb-24 flex flex-1 items-center justify-center">
          <p className="text-body-m-16 text-text-02">
            이 작업은 되돌릴 수 없습니다.
            <br />
            정말 계속하시겠습니까?
          </p>
        </div>
        <div className="flex justify-center gap-12">
          <button className="min-w-80 rounded-lg bg-gray-200 px-20 py-8 text-gray-700 hover:bg-gray-300">
            취소
          </button>
          <button className="min-w-80 rounded-lg bg-yellow-500 px-20 py-8 text-white hover:bg-yellow-600">
            계속
          </button>
        </div>
      </div>
    ),
    overlay: 'light',
  },
};

// 오버레이 스타일 비교
export const OverlayComparison: Story = {
  render: () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);

    const overlays = [
      { key: 'default', label: '기본', overlay: 'default' as const },
      { key: 'dark', label: '어두움', overlay: 'dark' as const },
      { key: 'light', label: '밝음', overlay: 'light' as const },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">오버레이 스타일 비교</h3>
        <div className="flex gap-4">
          {overlays.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setOpenDialog(key)}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {label} 오버레이
            </button>
          ))}
        </div>

        {overlays.map(({ key, label, overlay }) => (
          <Dialog
            key={key}
            isOpen={openDialog === key}
            onClose={() => setOpenDialog(null)}
            overlay={overlay}
          >
            <div className="flex h-full flex-col text-center">
              <div className="mb-24">
                <h2 className="text-display-20 text-text-01 font-bold">{label} 오버레이</h2>
              </div>
              <div className="mb-24 flex flex-1 items-center justify-center">
                <p className="text-body-m-16 text-text-02">{overlay} 스타일의 오버레이입니다.</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setOpenDialog(null)}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  닫기
                </button>
              </div>
            </div>
          </Dialog>
        ))}
      </div>
    );
  },
};

// 모서리 둥글기 비교
export const RoundedComparison: Story = {
  render: () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);

    const roundedOptions = [
      { key: 'default', label: '기본 (rounded-3xl)', rounded: 'default' as const },
      { key: 'none', label: '각진 모서리', rounded: 'none' as const },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">모서리 둥글기 비교</h3>
        <div className="flex gap-4">
          {roundedOptions.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setOpenDialog(key)}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {label}
            </button>
          ))}
        </div>

        {roundedOptions.map(({ key, label, rounded }) => (
          <Dialog
            key={key}
            isOpen={openDialog === key}
            onClose={() => setOpenDialog(null)}
            rounded={rounded}
          >
            <div className="flex h-full flex-col text-center">
              <div className="mb-24">
                <h2 className="text-display-20 text-text-01 font-bold">{label}</h2>
              </div>
              <div className="mb-24 flex flex-1 items-center justify-center">
                <p className="text-body-m-16 text-text-02">
                  {rounded === 'default' ? '둥근 모서리' : '각진 모서리'} 스타일입니다.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setOpenDialog(null)}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  닫기
                </button>
              </div>
            </div>
          </Dialog>
        ))}
      </div>
    );
  },
};

// 닫기 옵션 테스트
export const CloseOptionsTest: Story = {
  render: () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);

    const closeOptions = [
      {
        key: 'all-enabled',
        label: '모든 닫기 활성화',
        closeOnOverlayClick: true,
        closeOnEscape: true,
      },
      {
        key: 'overlay-disabled',
        label: '오버레이 클릭 비활성화',
        closeOnOverlayClick: false,
        closeOnEscape: true,
      },
      {
        key: 'escape-disabled',
        label: 'ESC 키 비활성화',
        closeOnOverlayClick: true,
        closeOnEscape: false,
      },
      {
        key: 'all-disabled',
        label: '모든 닫기 비활성화',
        closeOnOverlayClick: false,
        closeOnEscape: false,
      },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">닫기 옵션 테스트</h3>
        <div className="grid grid-cols-2 gap-4">
          {closeOptions.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setOpenDialog(key)}
              className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
            >
              {label}
            </button>
          ))}
        </div>

        {closeOptions.map(({ key, label, closeOnOverlayClick, closeOnEscape }) => (
          <Dialog
            key={key}
            isOpen={openDialog === key}
            onClose={() => setOpenDialog(null)}
            closeOnOverlayClick={closeOnOverlayClick}
            closeOnEscape={closeOnEscape}
          >
            <div className="flex h-full flex-col text-center">
              <div className="mb-24">
                <h2 className="text-display-20 text-text-01 font-bold">닫기 옵션 테스트</h2>
              </div>
              <div className="mb-24 flex flex-1 items-center justify-center">
                <div className="text-body-m-16 text-text-02 space-y-2">
                  <p>{label}</p>
                  <div className="space-y-1 text-sm">
                    <p>오버레이 클릭: {closeOnOverlayClick ? '✅ 활성화' : '❌ 비활성화'}</p>
                    <p>ESC 키: {closeOnEscape ? '✅ 활성화' : '❌ 비활성화'}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setOpenDialog(null)}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  버튼으로 닫기
                </button>
              </div>
            </div>
          </Dialog>
        ))}
      </div>
    );
  },
};
