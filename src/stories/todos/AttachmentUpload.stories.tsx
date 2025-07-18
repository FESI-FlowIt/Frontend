import type { Meta, StoryObj } from '@storybook/nextjs';

import AttachmentUpload from '@/components/todos/AttachmentUpload';

const meta: Meta<typeof AttachmentUpload> = {
  title: 'components/todos/AttachmentUpload',
  component: AttachmentUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '첨부파일 업로드 컴포넌트입니다. 파일 업로드와 링크 업로드를 탭으로 전환할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AttachmentUpload>;

export const 기본: Story = {
  render: () => {
    return <AttachmentUpload />;
  },
};

export const 파일탭활성화: Story = {
  render: () => {
    return <AttachmentUpload />;
  },
  parameters: {
    docs: {
      description: {
        story: '기본적으로 파일 업로드 탭이 활성화된 상태입니다.',
      },
    },
  },
};

export const 탭전환기능: Story = {
  render: () => {
    return (
      <div>
        <AttachmentUpload />
        <div className="mt-4 text-sm text-gray-600">
          <p>• 파일 업로드 버튼을 클릭하면 파일 업로드 영역이 표시됩니다.</p>
          <p>• 링크 첨부 버튼을 클릭하면 링크 업로드 영역이 표시됩니다.</p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '두 개의 탭 버튼을 통해 파일 업로드와 링크 첨부 기능을 전환할 수 있습니다.',
      },
    },
  },
};
