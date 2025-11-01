'use client';

import { Suspense, useEffect } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ErrorBoundary } from 'react-error-boundary';

import { useSidebar } from '@/app/providers/SidebarProvider';
import SidebarOpenIcon from '@/assets/icons/sidebar-right.svg';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';

import GoalModal from '../goals/GoalModal';
import { Button } from '../ui/Button';
import CustomLoading from '../ui/CustomLoading';
import ErrorFallback from '../ui/ErrorFallback';

const SidebarGoalsList = dynamic(() => import('./SidebarGoalsList'), {
  ssr: false,
  loading: () => <CustomLoading />,
});

import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarUser from './SidebarUser';

const CLOUDFRONT_URL = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_IMAGE_URL}`;

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();
  const { openGoalModal } = useModalStore();

  // 모바일/태블릿(< 1440px)에서 사이드바 열릴 때 뒤 컨텐츠 스크롤 방지
  useEffect(() => {
    if (isOpen && window.innerWidth < 1440) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* 오버레이 - 모바일/태블릿에서만 표시 */}
      <div
        className={cn(
          'fixed inset-0 z-400 bg-black/20 transition-opacity lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* 사이드바 열림 상태 */}
      {isOpen ? (
        <div
          className={cn(
            'border-line fixed inset-y-0 left-0 z-500 h-screen transform border-r bg-white',
            'w-full sm:max-w-280 md:max-w-320',
            'sm:rounded-tr-30 sm:rounded-br-30 md:rounded-tr-50 md:rounded-br-50',
            'flex flex-col py-16 sm:py-8 md:py-40',
            'translate-x-0 transition-transform duration-200 ease-in-out',
            'lg:rounded-tr-50 lg:rounded-br-50 lg:relative lg:h-full lg:max-w-280 lg:rounded-none lg:py-40',
          )}
        >
          <section className="mb-40 shrink-0 px-20">
            <SidebarHeader setIsOpen={setIsOpen} />
          </section>

          <section className="mb-32 shrink-0 px-30 sm:mb-20 sm:px-16 md:mb-32 md:px-30">
            <SidebarUser />
          </section>

          <section className="mb-16 shrink-0 px-20 sm:px-16 md:px-20">
            <SidebarMenu />
          </section>

          <section className="flex-1 overflow-y-auto px-20 sm:px-18 md:px-20">
            <ErrorBoundary fallback={<ErrorFallback type="general" />}>
              <Suspense fallback={<CustomLoading />}>
                <SidebarGoalsList />
              </Suspense>
            </ErrorBoundary>
          </section>

          <section className="sticky bottom-0 z-10 mt-auto shrink-0 px-20 py-8">
            <Button size="addgoal" disabled={false} onClick={() => openGoalModal()}>
              + 목표추가
            </Button>
          </section>

          <GoalModal />
        </div>
      ) : (
        <>
          {/* 사이드바 닫힘 상태 */}
          <div
            className={cn(
              'border-line fixed inset-y-0 left-0 z-30 flex min-h-screen w-100 transform flex-col items-center gap-36 border-r bg-white px-18 pt-40 transition-all duration-200 ease-in-out',
              'sm:hidden md:flex md:w-80',
              'translate-x-0 opacity-100',
              'lg:relative lg:flex lg:h-full lg:w-80',
            )}
          >
            <div className="relative h-36 w-36 sm:h-28 sm:w-28 md:h-36 md:w-36">
              <Image
                src={`${CLOUDFRONT_URL}/assets/images/flowIt-logo.svg`}
                alt="로고 이미지"
                fill
              />
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="rounded-12 border-line hover:bg-sidebar-hover flex h-44 w-44 cursor-pointer items-center justify-center border bg-white sm:h-32 sm:w-32 md:h-44 md:w-44"
              aria-label="사이드바 열기"
            >
              <SidebarOpenIcon
                className="text-gray-01 sm:h-17.45 sm:w-17.45 h-24 w-24"
                fill="currentColor"
              />
            </button>
          </div>

          {/* 모바일 상단 헤더 - sm에서만 표시 (태블릿) */}
          <div className="fixed top-0 z-20 hidden h-48 w-full items-center gap-12 bg-white px-16 sm:flex md:hidden">
            <div className="sm:gap-4.6 flex items-center">
              <div className="relative h-28 w-28">
                <Image
                  src={`${CLOUDFRONT_URL}/assets/images/flowIt-logo.svg`}
                  alt="로고 이미지"
                  fill
                />
              </div>
              <span className="sm:text-logo-24 text-black">FlowIt</span>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="rounded-12 border-line hover:bg-sidebar-hover flex h-32 w-32 cursor-pointer items-center justify-center border bg-white"
              aria-label="사이드바 열기"
            >
              <SidebarOpenIcon className="h-17.45 w-17.45" fill="currentColor" />
            </button>
          </div>
        </>
      )}
    </>
  );
}
