import React from 'react';

import clsx from 'clsx';

import { Button } from '@/components/ui/Button';

export interface TodoModalButtonProps {
  type: 'file' | 'link';
  activeTab: 'file' | 'link' | null;
  onClick: () => void;
  icon: React.ReactElement;
  children: React.ReactNode;
}

const TodoModalButton = ({ type, activeTab, onClick, icon, children }: TodoModalButtonProps) => {
  const isActive = activeTab === type;
  return (
    <Button
      variant={isActive ? 'secondary' : 'snackbar'}
      text={isActive ? 'secondaryModal' : 'snackbar'}
      icon={React.cloneElement(icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
        className: clsx({
          'text-gray-01': isActive,
          'text-white': !isActive,
        }),
      })}
      onClick={onClick}
      size={'md'}
      rounded={'lg'}
      type="button"
      disabled={false}
      className="flex-1 md:flex-none"
    >
      {children}
    </Button>
  );
};

export default TodoModalButton;
