import { Meta, StoryObj } from '@storybook/nextjs-vite';

import Card from '@/components/ui/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/ui/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'select',
      options: ['white', 'gray'],
    },
    icon: {
      control: 'text',
      description: 'Icon element for the card header',
    },
    title: {
      control: 'text',
      description: 'Title text for the card header',
    },
    extra: {
      control: 'text',
      description: 'Extra content for the card header (buttons, links, etc.)',
    },
    children: {
      control: 'text',
      description: 'Main content of the card',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '공통 Card 컴포넌트입니다. 아이콘, 제목, 추가 요소를 포함하는 헤더와 메인 콘텐츠 영역을 제공합니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: '기본 카드 콘텐츠입니다.',
    backgroundColor: 'gray',
  },
};

export const WithIconAndTitle: Story = {
  args: {
    icon: '📊',
    title: '작업 시간 분석',
    children: '아이콘과 제목이 있는 카드입니다.',
    backgroundColor: 'gray',
  },
};

export const WithIconAndTitleAndExtra: Story = {
  args: {
    icon: '📅',
    title: '마감일 캘린더',
    extra: (
      <div className="flex items-center gap-12">
        <button className="rounded-4 p-4 hover:bg-gray-100">←</button>
        <span className="text-14">2025년 7월</span>
        <button className="rounded-4 p-4 hover:bg-gray-100">→</button>
      </div>
    ),
    children: '헤더에 추가 요소가 있는 카드입니다.',
    backgroundColor: 'gray',
  },
};
