import React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { IconButton } from './IconButton';

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
        active: 'bg-primary-01 text-white',
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
  maxVisiblePages?: number; // 화살표 클릭 시 이동할 페이지 수 (기본값: 5)
  showArrows?: boolean;
}

const Pagination = ({
  pagination,
  onPageChange,
  showArrows = true,
  size,
  className,
  maxVisiblePages = 5, // 화살표 클릭 시 이동할 페이지 수
  ...props
}: PaginationProps) => {
  const { currentPage, totalPages, hasPrev, hasNext } = pagination;

  const getVisiblePages = () => {
    const pages: number[] = [];

    const groupStart = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const groupEnd = Math.min(groupStart + maxVisiblePages - 1, totalPages);

    for (let i = groupStart; i <= groupEnd; i++) {
      pages.push(i);
    }

    return pages;
  };

  const getNextGroupFirstPage = () => {
    const currentGroupStart = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const nextGroupStart = currentGroupStart + maxVisiblePages;
    return Math.min(nextGroupStart, totalPages);
  };

  const getPrevGroupFirstPage = () => {
    const currentGroupStart = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const prevGroupStart = currentGroupStart - maxVisiblePages;
    return Math.max(1, prevGroupStart);
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn(paginationVariants({ size }), className)} {...props}>
      {showArrows && (
        <div className={cn(arrowButtonVariants({ size }), 'mr-8')}>
          <IconButton
            variant="paginationArrowPrev"
            aria-label="이전 페이지"
            onClick={() => onPageChange(getPrevGroupFirstPage())}
            disabled={!hasPrev}
            className="disabled:cursor-not-allowed disabled:opacity-50"
          />
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
          <IconButton
            variant="paginationArrowNext"
            aria-label="다음 페이지"
            onClick={() => onPageChange(getNextGroupFirstPage())}
            disabled={!hasNext}
            className="disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
