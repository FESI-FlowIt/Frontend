import { useState } from 'react';

import { PopoverPosition, PopoverType } from '@/interfaces/popover';
import { calculateCalendarPosition, calculateHeatmapPosition } from '@/lib/popover';

const usePopover = (type: PopoverType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<PopoverPosition>({ top: 0, left: 0 });

  const open = (triggerElement: HTMLElement, containerElement?: HTMLElement | null) => {
    let calculatedPosition: PopoverPosition;

    if (type === 'heatmap') {
      calculatedPosition = calculateHeatmapPosition(triggerElement, containerElement);
    } else {
      calculatedPosition = calculateCalendarPosition(triggerElement, containerElement!);
    }

    setPosition(calculatedPosition);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return { isOpen, position, open, close };
};

export default usePopover;
