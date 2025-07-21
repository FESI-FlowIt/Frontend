'use client';

import Image from 'next/image';

export default function SidebarMenu() {
  return (
    <div className="flex flex-col">
      <div className="border-line mb-16 flex h-84 w-260 items-center gap-12 border-y-2 px-10 py-16">
        <button className="relative h-24 w-24 cursor-pointer">
          <Image src="/assets/icons/homeIcon.svg" alt="대쉬보드 아이콘" fill />
        </button>
        <span className="text-text-01 text-body-sb-20">대시보드</span>
      </div>

      <div className="flex w-260 flex-col gap-16">
        <div className="flex h-52 w-260 items-center gap-12 px-10">
          <div className="relative h-24 w-24">
            <Image src="/assets/icons/goalIcon.svg" alt="목표 아이콘" fill />
          </div>
          <span className="text-text-01 text-body-sb-20">목표</span>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex h-52 w-260 items-center justify-between px-10">
            <div className="flex items-center gap-20">
              <div className="bg-error h-12 w-12 rounded-full" />
              <span className="text-text-02 text-body-m-20">개발</span>
            </div>
            <button className="relative h-24 w-24 cursor-pointer">
              <Image src="/assets/icons/pinIcon_off.svg" alt="핀 오프 아이콘" fill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
