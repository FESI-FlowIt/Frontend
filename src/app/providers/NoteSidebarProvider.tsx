'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface NoteSidebarContextType {
  isNoteSidebarOpen: boolean;
  setIsNoteSidebarOpen: (value: boolean) => void;
}

const NoteSidebarContext = createContext<NoteSidebarContextType | undefined>(undefined);

export const useNoteSidebar = () => {
  const context = useContext(NoteSidebarContext);
  if (!context) {
    throw new Error('useNoteSidebar must be used within a NoteSidebarProvider');
  }
  return context;
};

export const NoteSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isNoteSidebarOpen, setIsNoteSidebarOpen] = useState(false);

  return (
    <NoteSidebarContext.Provider value={{ isNoteSidebarOpen, setIsNoteSidebarOpen }}>
      {children}
    </NoteSidebarContext.Provider>
  );
};
