import { useState } from 'react';

export interface PopoverPosition {
  top: number;
  left: number;
}

const usePopover = (initialPosition: PopoverPosition = { top: 0, left: 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<PopoverPosition>(initialPosition);

  const open = (newPosition?: PopoverPosition) => {
    if (newPosition) {
      setPosition(newPosition);
    }
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = (newPosition?: PopoverPosition) => {
    if (isOpen) {
      close();
    } else {
      open(newPosition);
    }
  };

  return {
    isOpen,
    position,
    setPosition,
    open,
    close,
    toggle,
  };
};

export default usePopover;
