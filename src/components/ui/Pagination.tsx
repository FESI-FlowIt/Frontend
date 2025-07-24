import React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import ArrowBack from '@/assets/ArrowBack.svg';
import ArrowForward from '@/assets/ArrowForward.svg';
import { cn } from '@/lib/utils';

const paginationVariants = cva('mt-38 flex items-center justify-center gap-16', {
  variants: {
    size: {
      md: 'gap-16',
      lg: 'gap-24',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const pageButtonVariants = cva(
  'rounded-12 text-body-sb-20 cursor-pointer font-semibold transition-colors',
  {
    variants: {
      size: {
        sm: 'h-36 w-36 p-8',
        md: 'h-44 w-44 p-11',
        lg: 'h-52 w-52 p-14',
      },
      variant: {
        active: 'bg-primary-01 text-text-00',
        inactive: 'bg-tertiary-01 text-text-03 hover:bg-tertiary-01-press',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'inactive',
    },
  },
);

const arrowButtonVariants = cva('cursor-pointer', {
  variants: {
    size: {
      sm: 'h-36 w-36 p-6',
      md: 'h-44 w-44 p-10',
      lg: 'h-52 w-52 p-14',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

interface PaginationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paginationVariants> {
  pagination: PaginationInfo;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  showArrows?: boolean;
}

const Pagination = ({
  pagination,
  onPageChange,
  maxVisiblePages = 5,
  showArrows = true,
  size,
  className,
  ...props
}: PaginationProps) => {
  const { currentPage, totalPages, hasPrev, hasNext } = pagination;

  // 표시할 페이지 번호들 계산
  const getVisiblePages = () => {
    const pages: number[] = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn(paginationVariants({ size }), className)} {...props}>
      {showArrows && (
        <div className={cn(arrowButtonVariants({ size }), 'mr-8')}>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrev}
            className="flex h-24 w-24 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowBack />
          </button>
        </div>
      )}

      <div className="flex items-center gap-16">
        {visiblePages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              pageButtonVariants({
                size,
                variant: page === currentPage ? 'active' : 'inactive',
              }),
            )}
          >
            {page}
          </button>
        ))}
      </div>

      {showArrows && (
        <div className={cn(arrowButtonVariants({ size }), 'ml-8')}>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNext}
            className="flex h-24 w-24 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowForward />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
