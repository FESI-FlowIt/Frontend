'use client';

import CheckIcon from '@/assets/icons/check.svg';
import { GOAL_COLOR_OPTIONS } from '@/constants/goalColors';

interface ColorChipSelectorProps {
  selectedColor: string;
  //eslint-disable-next-line no-unused-vars
  onSelectColor: (color: string) => void;
}

const ColorChipSelector = ({ selectedColor, onSelectColor }: ColorChipSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-20">
      {Object.values(GOAL_COLOR_OPTIONS).map(color => (
        <button
          key={color}
          type="button"
          style={{ backgroundColor: `var(${color})` }}
          className={`flex h-32 w-32 transform cursor-pointer items-center justify-center rounded-full ${
            selectedColor === color ? 'ring-primary-01 ring-3' : ''
          }`}
          onClick={() => onSelectColor(color)}
          aria-label={`색상 선택: ${color}`}
        >
          {selectedColor === color && <CheckIcon className="text-white" width={16} height={16} />}
        </button>
      ))}
    </div>
  );
};

export default ColorChipSelector;
