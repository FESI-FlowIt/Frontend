'use client';

import { SidebarProvider } from '@/app/providers/SidebarProvider';
import Sidebar from '@/components/sidebar/Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="bg-background flex min-h-screen">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  );
}

function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-1 transition-all duration-300">
      <div className="flex h-full flex-1 justify-center overflow-auto px-30">
        <div className="mx-auto w-full py-36">{children}</div>
      </div>
    </main>
  );
}
