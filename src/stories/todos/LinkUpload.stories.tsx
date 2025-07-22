import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import LinkUpload from '@/components/todos/LinkUpload';
import { Attachment } from '@/interfaces/todo';

const meta: Meta<typeof LinkUpload> = {
  title: 'Components/todos/LinkUpload',
  component: LinkUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '링크 업로드 컴포넌트입니다. 링크 모달을 통해 링크를 추가하고 관리할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    attachments: { control: { type: 'object' } },
  },
};

export default meta;
type Story = StoryObj<typeof LinkUpload>;

export const EmptyState: Story = {
  render: args => {
    const [attachments, setAttachments] = useState<Attachment[]>([]);

    return (
      <div className="w-500">
        <LinkUpload
          {...args}
          attachments={attachments}
          onLinksChange={links => {
            console.log('추가된 링크:', links);
            setAttachments(links);
          }}
        />
      </div>
    );
  },
  args: {
    attachments: [],
  },
};

export const HasLink: Story = {
  render: args => {
    const [attachments, setAttachments] = useState<Attachment[]>([
      {
        type: 'link',
        url: 'https://github.com/example/repo',
        fileName: 'GitHub Repository',
      },
    ]);

    return (
      <LinkUpload
        {...args}
        attachments={attachments}
        onLinksChange={links => {
          console.log('변경된 링크:', links);
          setAttachments(links);
        }}
      />
    );
  },
};

export const LongURL: Story = {
  render: args => {
    const [attachments, setAttachments] = useState<Attachment[]>([
      {
        type: 'link',
        url: 'https://very-long-domain-name-for-testing.com/very/long/path/to/some/resource/that/might/be/truncated',
        fileName: 'Very Long URL Title That Might Be Truncated',
      },
    ]);

    return (
      <LinkUpload
        {...args}
        attachments={attachments}
        onLinksChange={links => {
          console.log('변경된 링크:', links);
          setAttachments(links);
        }}
      />
    );
  },
};
