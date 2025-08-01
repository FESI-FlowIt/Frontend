'use client';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Tab 버튼 variants
const tabVariants = cva(
  'text-body-m-16 md:text-body-m-20 rounded-8 flex h-24 w-136 items-center justify-center transition-all duration-200 md:h-32 md:w-156',
  {
    variants: {
      variant: {
        active: 'text-text-02 bg-white',
        inactive: 'text-text-04 hover:text-text-03 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'inactive',
    },
  },
);

// Tab 컨테이너 variants
const tabContainerVariants = cva('bg-line rounded-8 flex h-32 w-fit gap-0 p-4 md:h-40');

export interface TabItem {
  id: string;
  label: string;
}

interface TabProps extends VariantProps<typeof tabContainerVariants> {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Tab = ({ items, value, onChange, className }: TabProps) => {
  const activeValue = value ?? items[0]?.id ?? '';

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={cn(tabContainerVariants(), className)}>
      {items.map(item => {
        const isActive = activeValue === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={cn(
              tabVariants({
                variant: isActive ? 'active' : 'inactive',
              }),
              'cursor-pointer',
            )}
            type="button"
            role="tab"
            aria-selected={isActive}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tab;
