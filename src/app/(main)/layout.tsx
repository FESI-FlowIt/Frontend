'use client';

import { usePathname } from 'next/navigation';

import { NoteSidebarProvider } from '@/app/providers/NoteSidebarProvider';
import { SidebarProvider } from '@/app/providers/SidebarProvider';
import Sidebar from '@/components/sidebar/Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <NoteSidebarProvider>
        <SidebarLayout>{children}</SidebarLayout>
      </NoteSidebarProvider>
    </SidebarProvider>
  );
}

function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTodoNoteNewPage = /^\/todo\/[^/]+\/note\/new$/.test(pathname);

  return (
    <div
      className={`${isTodoNoteNewPage ? 'bg-white' : 'bg-background'} flex h-screen overflow-hidden`}
    >
      <Sidebar />

      <MainContent>{children}</MainContent>
    </div>
  );
}

function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-w-0 flex-1 flex-col overflow-y-auto transition-all duration-300">
      <div className="flex w-full flex-1 justify-center sm:px-16 md:pr-13 md:pl-93 lg:px-30">
        <div className="w-full max-w-1296 sm:py-16 md:py-36">{children}</div>
      </div>
    </main>
  );
}
