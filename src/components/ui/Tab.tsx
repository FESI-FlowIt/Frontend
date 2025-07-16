'use client';

import { useState } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Tab 버튼 variants
const tabVariants = cva(
  'text-body-m-16 md:text-body-m-20 rounded-8 flex h-24 items-center justify-center transition-all duration-200 md:h-32',
  {
    variants: {
      variant: {
        active: 'text-text-02 bg-ui-background',
        inactive: 'text-text-04 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'inactive',
    },
  },
);

// Tab 컨테이너 variants
const tabContainerVariants = cva('bg-line rounded-8 flex h-32 w-280 gap-0 p-4 md:h-40 md:w-320');

export interface TabItem {
  id: string;
  label: string;
}

interface TabProps extends VariantProps<typeof tabContainerVariants> {
  items: TabItem[];
  defaultValue?: string; // 비제어 컴포넌트용
  value?: string; // 제어 컴포넌트용
  onChange?: (value: string) => void;
  className?: string;
}

const Tab = ({ items, defaultValue, value, onChange, className }: TabProps) => {
  // 비제어 컴포넌트용 내부 상태
  const [internalValue, setInternalValue] = useState(defaultValue || items[0]?.id || '');

  const activeTab = value !== undefined ? value : internalValue;

  const handleTabClick = (id: string) => {
    if (value === undefined) {
      setInternalValue(id);
    }
    onChange?.(id);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={cn(tabContainerVariants(), className)}>
      {items.map(item => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={cn(
              tabVariants({
                variant: isActive ? 'active' : 'inactive',
              }),
              'flex-1 cursor-pointer px-4',
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
