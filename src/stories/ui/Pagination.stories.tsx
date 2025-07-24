import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import Pagination from '@/components/ui/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/ui/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    pagination: {
      description: '페이지네이션 정보 객체',
    },
    onPageChange: {
      action: 'page changed',
      description: '페이지가 변경될 때 호출되는 콜백',
    },
    maxVisiblePages: {
      control: 'number',
      description: '한 번에 표시할 페이지 수 및 화살표 클릭 시 이동할 페이지 수',
    },
    showArrows: {
      control: 'boolean',
      description: '이전/다음 화살표 표시 여부',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '페이지네이션의 크기',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (Interactive)
export const Default: Story = {
  render: args => {
    const [currentPage, setCurrentPage] = useState(args.pagination?.currentPage || 1);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      args.onPageChange?.(page);
    };

    const pagination = {
      ...args.pagination,
      currentPage,
      hasPrev: currentPage > 1,
      hasNext: currentPage < (args.pagination?.totalPages || 10),
    };

    return <Pagination {...args} pagination={pagination} onPageChange={handlePageChange} />;
  },
  args: {
    pagination: {
      currentPage: 1,
      totalPages: 20,
      hasPrev: false,
      hasNext: true,
    },
    maxVisiblePages: 5,
    showArrows: true,
    size: 'md',
  },
};

// 크기별 스토리
export const Sizes: Story = {
  render: () => {
    const [currentPages, setCurrentPages] = useState({
      sm: 1,
      md: 1,
      lg: 1,
    });

    const handlePageChange = (size: keyof typeof currentPages, page: number) => {
      setCurrentPages(prev => ({
        ...prev,
        [size]: page,
      }));
    };

    const createPagination = (size: keyof typeof currentPages) => ({
      currentPage: currentPages[size],
      totalPages: 5,
      hasPrev: currentPages[size] > 1,
      hasNext: currentPages[size] < 5,
    });

    return (
      <div className="flex flex-col items-center gap-16">
        <div className="text-center">
          <h3 className="mb-8 text-lg font-semibold">Medium</h3>
          <Pagination
            size="md"
            pagination={createPagination('md')}
            onPageChange={page => handlePageChange('md', page)}
            maxVisiblePages={5}
            showArrows={true}
          />
        </div>
        <div className="text-center">
          <h3 className="mb-8 text-lg font-semibold">Large</h3>
          <Pagination
            size="lg"
            pagination={createPagination('lg')}
            onPageChange={page => handlePageChange('lg', page)}
            maxVisiblePages={5}
            showArrows={true}
          />
        </div>
      </div>
    );
  },
};

// 다양한 페이지 수
export const DifferentPageCounts: Story = {
  render: () => {
    const [currentPages, setCurrentPages] = useState({
      few: 1,
      many: 5,
      single: 1,
    });

    const handlePageChange = (type: keyof typeof currentPages, page: number) => {
      setCurrentPages(prev => ({
        ...prev,
        [type]: page,
      }));
    };

    return (
      <div className="flex flex-col items-center gap-16">
        <div className="text-center">
          <h3 className="mb-8 text-lg font-semibold">단일 페이지 (숨김)</h3>
          <Pagination
            pagination={{
              currentPage: 1,
              totalPages: 1,
              hasPrev: false,
              hasNext: false,
            }}
            onPageChange={page => handlePageChange('single', page)}
            size="md"
          />
          <p className="mt-4 text-sm text-gray-500">1페이지일 때는 페이지네이션이 숨겨집니다</p>
        </div>
        <div className="text-center">
          <h3 className="mb-8 text-lg font-semibold">적은 페이지 수 (3페이지)</h3>
          <Pagination
            pagination={{
              currentPage: currentPages.few,
              totalPages: 3,
              hasPrev: currentPages.few > 1,
              hasNext: currentPages.few < 3,
            }}
            onPageChange={page => handlePageChange('few', page)}
            size="md"
          />
        </div>
        <div className="text-center">
          <h3 className="mb-8 text-lg font-semibold">많은 페이지 수 (20페이지)</h3>
          <Pagination
            pagination={{
              currentPage: currentPages.many,
              totalPages: 20,
              hasPrev: currentPages.many > 1,
              hasNext: currentPages.many < 20,
            }}
            onPageChange={page => handlePageChange('many', page)}
            maxVisiblePages={5}
            size="md"
          />
        </div>
      </div>
    );
  },
};

// maxVisiblePages 옵션 비교
export const MaxVisiblePagesComparison: Story = {
  render: () => {
    const [currentPages, setCurrentPages] = useState({
      pages3: 1,
      pages5: 1,
      pages10: 1,
    });

    const handlePageChange = (type: keyof typeof currentPages, page: number) => {
      setCurrentPages(prev => ({
        ...prev,
        [type]: page,
      }));
    };

    const createPagination = (type: keyof typeof currentPages) => ({
      currentPage: currentPages[type],
      totalPages: 30,
      hasPrev: currentPages[type] > 1,
      hasNext: currentPages[type] < 30,
    });

    return (
      <div className="flex flex-col items-center gap-16">
        <div className="text-center">
          <h3 className="mb-8 text-lg font-semibold">maxVisiblePages = 3 (3페이지씩 이동)</h3>
          <Pagination
            pagination={createPagination('pages3')}
            onPageChange={page => handlePageChange('pages3', page)}
            maxVisiblePages={3}
            size="md"
          />
          <p className="mt-4 text-sm text-gray-500">
            화살표 클릭시 3페이지씩 이동, 3개씩 그룹 표시
          </p>
        </div>
        <div className="text-center">
          <h3 className="mb-8 text-lg font-semibold">maxVisiblePages = 5 (5페이지씩 이동)</h3>
          <Pagination
            pagination={createPagination('pages5')}
            onPageChange={page => handlePageChange('pages5', page)}
            maxVisiblePages={5}
            size="md"
          />
          <p className="mt-4 text-sm text-gray-500">
            화살표 클릭시 5페이지씩 이동, 5개씩 그룹 표시
          </p>
        </div>
        <div className="text-center">
          <h3 className="mb-8 text-lg font-semibold">maxVisiblePages = 10 (10페이지씩 이동)</h3>
          <Pagination
            pagination={createPagination('pages10')}
            onPageChange={page => handlePageChange('pages10', page)}
            maxVisiblePages={10}
            size="md"
          />
          <p className="mt-4 text-sm text-gray-500">
            화살표 클릭시 10페이지씩 이동, 10개씩 그룹 표시
          </p>
        </div>
      </div>
    );
  },
};

// 화살표 옵션
export const ArrowOptions: Story = {
  render: () => {
    const [currentPages, setCurrentPages] = useState({
      withArrows: 3,
      withoutArrows: 3,
    });

    const handlePageChange = (type: keyof typeof currentPages, page: number) => {
      setCurrentPages(prev => ({
        ...prev,
        [type]: page,
      }));
    };

    const createPagination = (type: keyof typeof currentPages) => ({
      currentPage: currentPages[type],
      totalPages: 10,
      hasPrev: currentPages[type] > 1,
      hasNext: currentPages[type] < 10,
    });

    return (
      <div className="flex flex-col items-center gap-16">
        <div className="text-center">
          <h3 className="mb-8 text-lg font-semibold">화살표 있음</h3>
          <Pagination
            pagination={createPagination('withArrows')}
            onPageChange={page => handlePageChange('withArrows', page)}
            showArrows={true}
            size="md"
          />
        </div>
        <div className="text-center">
          <h3 className="mb-8 text-lg font-semibold">화살표 없음</h3>
          <Pagination
            pagination={createPagination('withoutArrows')}
            onPageChange={page => handlePageChange('withoutArrows', page)}
            showArrows={false}
            size="md"
          />
        </div>
      </div>
    );
  },
};

// Playground
export const Playground: Story = {
  render: args => {
    const [currentPage, setCurrentPage] = useState(args.pagination?.currentPage || 1);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      args.onPageChange?.(page);
    };

    const pagination = {
      ...args.pagination,
      currentPage,
      hasPrev: currentPage > 1,
      hasNext: currentPage < (args.pagination?.totalPages || 10),
    };

    return (
      <div className="p-8">
        <Pagination {...args} pagination={pagination} onPageChange={handlePageChange} />
      </div>
    );
  },
  args: {
    pagination: {
      currentPage: 1,
      totalPages: 30,
      hasPrev: false,
      hasNext: true,
    },
    maxVisiblePages: 5,
    showArrows: true,
    size: 'md',
  },
};
