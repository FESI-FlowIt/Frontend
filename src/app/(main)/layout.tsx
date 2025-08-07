'use client';

import { usePathname } from 'next/navigation';

import { SidebarProvider, useSidebar } from '@/app/providers/SidebarProvider';
import Sidebar from '@/components/sidebar/Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarLayout>{children}</SidebarLayout>
    </SidebarProvider>
  );
}

function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTodoNoteNewPage = /^\/todo\/[^/]+\/note\/new$/.test(pathname);
  const { isOpen } = useSidebar();

  return (
    <div
      className={`${isTodoNoteNewPage ? 'bg-white' : 'bg-background'} ${isOpen ? 'sm:flex-row' : 'sm:flex-col'} flex min-h-screen md:flex-row`}
    >
      <Sidebar />
      <MainContent>{children}</MainContent>
    </div>
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
