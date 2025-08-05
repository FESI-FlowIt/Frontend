import { useState } from 'react';

import { PopoverPosition, PopoverType } from '@/interfaces/popover';
import { calculateCalendarPosition, calculateHeatmapPosition } from '@/lib/popover';

const usePopover = (type: PopoverType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<PopoverPosition>({ top: 0, left: 0 });

  const open = (triggerElement: HTMLElement, containerElement?: HTMLElement | null) => {
    let calculatedPosition: PopoverPosition;

    switch (type) {
      case 'heatmap':
        calculatedPosition = calculateHeatmapPosition(triggerElement, containerElement);
        break;
      case 'calendar':
        calculatedPosition = calculateCalendarPosition(triggerElement, containerElement!);
        break;
      default:
        throw new Error(`Unknown popover type: ${type}`);
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
