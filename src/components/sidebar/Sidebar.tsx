'use client';

import { useState } from 'react';

import Image from 'next/image';

import SidebarOpen from '@/../public/assets/icons/menu-right.svg';
import { useModalStore } from '@/store/modalStore';

import GoalModal from '../goals/GoalModal';
import { Button } from '../ui/Button';

import SidebarGoalsList from './SidebarGoalsList';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarUser from './SidebarUser';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { openGoalModal } = useModalStore();

  return isOpen ? (
    <div className="border-line rounded-tr-50 rounded-br-50 flex h-screen w-320 flex-col items-center border-r bg-white py-40 sm:w-280 sm:py-8 md:w-320 md:py-40">
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
      <div className="border-line rounded-tr-50 rounded-br-50 h-screen w-100 flex-col items-center gap-36 border-r bg-white px-18 pt-40 sm:hidden md:flex md:w-80 lg:flex">
        <div className="relative h-36 w-36 sm:h-28 sm:w-28 md:h-36 md:w-36">
          <Image src="/assets/images/logoIcon.svg" alt="로고 이미지" fill />
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="rounded-12 border-line hover:bg-sidebar-hover flex h-44 w-44 cursor-pointer items-center justify-center border bg-white hover:border-none sm:h-32 sm:w-32 md:h-44 md:w-44"
        >
          <SidebarOpen className="sm:h-17.45 sm:w-17.45 h-24 w-24 md:h-24 md:w-24" />
        </button>
      </div>

      <div className="sm:flex sm:items-center sm:gap-12 sm:bg-white sm:px-16 md:hidden lg:hidden">
        <div className="sm:gap-4.6 sm:flex sm:items-center">
          <div className="sm:relative sm:h-28 sm:w-28">
            <Image src="/assets/images/logoIcon.svg" alt="로고 아이콘" fill />
          </div>
          <span className="sm:text-logo-24 sm:text-black">FlowIt</span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="sm:rounded-12 sm:border-line hover:bg-sidebar-hover bg-white hover:border-none sm:flex sm:h-32 sm:w-32 sm:cursor-pointer sm:items-center sm:justify-center sm:border"
        >
          <SidebarOpen className="sm:h-17.45 sm:w-17.45" />
        </button>
      </div>
    </>
  );
}
