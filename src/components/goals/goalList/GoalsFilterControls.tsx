import React, { useRef, useState } from 'react';

import DownArrow from '@/../public/assets/icons/downArrow.svg';
import PinOnIcon from '@/assets/icons/pin-on.svg';
import DropdownMenu from '@/components/ui/DropdownMenu';
import ToggleButton from '@/components/ui/ToggleButton';
import { GetGoalsRequestParams } from '@/interfaces/goal';

interface GoalsFilterControlsProps {
  params: GetGoalsRequestParams;
  // eslint-disable-next-line no-unused-vars
  onSortChange: (sortBy: 'latest' | 'deadlineDate') => void;
  // eslint-disable-next-line no-unused-vars
  onFilterChange: (isPinned?: boolean) => void;
}

const GoalsFilterControls = ({
  params,
  onSortChange,
  onFilterChange,
}: GoalsFilterControlsProps) => {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLButtonElement>(null);

  // 정렬 옵션 상수
  const SORT_OPTIONS = {
    latest: '최신 등록순',
    deadlineDate: '마감 임박순',
  } as const;

  const getSortText = (sortBy: 'latest' | 'deadlineDate' | undefined) => {
    return sortBy === 'deadlineDate' ? SORT_OPTIONS.deadlineDate : SORT_OPTIONS.latest;
  };

  const handleSortOptionClick = (sortBy: 'latest' | 'deadlineDate') => {
    onSortChange(sortBy);
    setIsSortDropdownOpen(false);
  };

  return (
    <div className="mb-32 flex items-center justify-between">
      <div className="flex items-center gap-16">
        {/* 필터링 */}
        <div className="flex items-center justify-center">
          <div className="mr-4 flex h-24 w-24 items-center justify-center p-2">
            <PinOnIcon className="text-heatmap-accent" width={24} height={24} fill="currentColor" />
          </div>
          <div className="text-body-sb-20 text-text-01 pr-12 font-semibold">고정된 목표만 보기</div>
          <ToggleButton
            checked={params.isPinned === true}
            onCheckedChange={checked => onFilterChange(checked ? true : undefined)}
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="relative">
          <button
            ref={sortDropdownRef}
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            className="text-body-sb-20 text-text-01 flex items-center gap-8 px-12 py-13 font-semibold transition-colors"
          >
            {getSortText(params.sortBy)}
            <div className="flex h-24 w-24 items-center justify-center">
              <DownArrow className="text-snackbar" />
            </div>
          </button>
          <DropdownMenu
            isOpen={isSortDropdownOpen}
            onClose={() => setIsSortDropdownOpen(false)}
            triggerRef={sortDropdownRef}
            size="auto"
            position="bottom-right"
          >
            <div>
              <button
                onClick={() => handleSortOptionClick('latest')}
                className={`text-body-sb-20 w-full px-12 py-13 text-left transition-colors ${
                  params.sortBy === 'latest' ? 'bg-ui-background text-primary-01' : 'text-text-03'
                }`}
              >
                {SORT_OPTIONS.latest}
              </button>
              <button
                onClick={() => handleSortOptionClick('deadlineDate')}
                className={`text-body-sb-20 w-full rounded-b-[20px] px-12 py-13 text-left transition-colors ${
                  params.sortBy === 'deadlineDate'
                    ? 'bg-ui-background text-primary-01'
                    : 'text-text-03'
                }`}
              >
                {SORT_OPTIONS.deadlineDate}
              </button>
            </div>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default GoalsFilterControls;
