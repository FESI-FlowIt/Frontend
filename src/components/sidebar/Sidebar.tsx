'use client';

import Image from 'next/image';

import { useSidebar } from '@/app/providers/SidebarProvider';
import SidebarOpenIcon from '@/assets/icons/sidebar-right.svg';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';

import GoalModal from '../goals/GoalModal';
import { Button } from '../ui/Button';

import SidebarGoalsList from './SidebarGoalsList';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarUser from './SidebarUser';

const CLOUDFRONT_URL = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_IMAGE_URL}`;

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();
  const { openGoalModal } = useModalStore();

  return isOpen ? (
    <div
      className={cn(
        `border-line md:rounded-tr-50 md:rounded-br-50 sm:rounded-tr-30 sm:rounded-br-30 flex min-h-screen w-320 transform flex-col items-center border-r bg-white py-40 transition-all duration-300 ease-in-out sm:w-280 sm:py-8 md:w-320 md:py-40`,
        {
          'translate-x-0 opacity-100': isOpen,
          'pointer-events-none -translate-x-full opacity-0': !isOpen,
        },
      )}
    >
      <section className="mb-40 shrink-0 px-20">
        <SidebarHeader setIsOpen={setIsOpen} />
      </section>

      <div className="flex flex-1 flex-col overflow-y-auto">
        <section className="mb-32 shrink-0 px-30 sm:mb-20 sm:px-16 md:mb-32 md:px-30">
          <SidebarUser />
        </section>

        <section className="mb-16 shrink-0 px-20 sm:px-16 md:px-20">
          <SidebarMenu />
        </section>

        <section className="mb-100 shrink-0 px-20 sm:px-18 md:px-20">
          <SidebarGoalsList />
        </section>

        <section className="shrink-0 px-30 sm:px-10 md:px-30">
          <Button size="addgoal" disabled={false} onClick={() => openGoalModal()}>
            + 목표추가
          </Button>
        </section>
      </div>

      <GoalModal />
    </div>
  ) : (
    <>
      <div
        className={cn(
          `border-line rounded-tr-50 rounded-br-50 min-h-screen w-100 transform flex-col items-center gap-36 border-r bg-white px-18 pt-40 transition-all duration-300 ease-in-out sm:hidden md:flex md:w-80 lg:flex`,
          {
            'translate-x-0 opacity-100': !isOpen,
            'pointer-events-none -translate-x-full opacity-0': isOpen,
          },
        )}
      >
        <div className="relative h-36 w-36 sm:h-28 sm:w-28 md:h-36 md:w-36">
          <Image src={`${CLOUDFRONT_URL}/assets/images/flowIt-logo.svg`} alt="로고 이미지" fill />
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="rounded-12 border-line hover:bg-sidebar-hover flex h-44 w-44 cursor-pointer items-center justify-center border bg-white hover:border-none sm:h-32 sm:w-32 md:h-44 md:w-44"
        >
          <SidebarOpenIcon
            className="sm:h-17.45 sm:w-17.45 text-gray-01 h-24 w-24 md:h-24 md:w-24"
            fill="currentColor"
          />
        </button>
      </div>

      <div className="h-48 sm:flex sm:items-center sm:gap-12 sm:bg-white sm:px-16 md:hidden lg:hidden">
        <div className="sm:gap-4.6 sm:flex sm:items-center">
          <div className="sm:relative sm:h-28 sm:w-28">
            <Image src={`${CLOUDFRONT_URL}/assets/images/flowIt-logo.svg`} alt="로고 이미지" fill />
          </div>
          <span className="sm:text-logo-24 sm:text-black">FlowIt</span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="sm:rounded-12 sm:border-line hover:bg-sidebar-hover bg-white hover:border-none sm:flex sm:h-32 sm:w-32 sm:cursor-pointer sm:items-center sm:justify-center sm:border"
        >
          <SidebarOpenIcon className="sm:h-17.45 sm:w-17.45" fill="currentColor" />
        </button>
      </div>
    </>
  );
}
