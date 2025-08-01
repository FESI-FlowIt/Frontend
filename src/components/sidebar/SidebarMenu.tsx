'use client';

import { useRouter } from 'next/navigation';

import GoalIcon from '@/assets/icons/goal.svg';
import HomeIcon from '@/assets/icons/home.svg';
import { ROUTES } from '@/lib/routes';

export default function SidebarMenu() {
  const router = useRouter();

  return (
    <div className="flex w-260 flex-col gap-16 sm:w-248 md:w-260">
      <div
        onClick={() => router.push(ROUTES.DASHBOARD)}
        className="border-line flex h-84 w-260 items-center gap-12 border-y-2 px-10 py-16 sm:h-72 sm:w-248 sm:px-0 md:h-84 md:w-260 md:px-10"
      >
        <button className="relative h-24 w-24 cursor-pointer sm:h-20 sm:w-20 md:h-24 md:w-24">
          <HomeIcon className="text-gray-01" width={24} height={24} fill="currentColor" />
        </button>
        <span className="text-text-01 text-body-sb-20 md:text-body-sb-20 sm:text-body-b-16">
          대시보드
        </span>
      </div>

      <div className="flex h-52 w-260 items-center gap-12 px-10 sm:h-40 sm:w-248 sm:px-0 md:h-52 md:w-260 md:px-10">
        <div className="relative h-24 w-24 sm:h-20 sm:w-20 md:h-24 md:w-24">
          <GoalIcon className="text-gray-01 h-full w-full" fill="currentColor" />
        </div>
        <span className="text-text-01 text-body-sb-20 md:text-body-sb-20 sm:text-body-b-16">
          목표
        </span>
      </div>
    </div>
  );
}
