'use client';

import Image from 'next/image';

import SidebarHide from '@/../public/assets/icons/menu-left.svg';

export default function SidebarHeader() {
  //TODO: 전체 사이드바 컴포넌트 조합 시 prop으로 사이드바 닫아주는 handleClick 함수 넣어줄 예정입니다.
  const handleClick = () => {
    console.log('사이드바 닫기');
  };
  return (
    <div className="flex items-center gap-86">
      <div className="flex items-center gap-6">
        <div className="relative h-36 w-36">
          <Image src="/assets/images/logoIcon.svg" alt="로고 아이콘" fill />
        </div>
        <span className="text-logo-31 text-black">FlowIt</span>
      </div>
      <button
        onClick={handleClick}
        className="rounded-12 border-line hover:bg-sidebar-hover flex h-44 w-44 cursor-pointer items-center justify-center border bg-white hover:border-none"
      >
        <SidebarHide className="h-24 w-24" />
      </button>
    </div>
  );
}
