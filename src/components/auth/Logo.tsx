'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/routes';

export default function Logo() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(ROUTES.HOME)}
      className="flex w-full cursor-pointer items-center justify-center gap-10 sm:gap-6 md:gap-10"
    >
      <div className="relative h-60 w-60 translate-y-4 sm:h-36 sm:w-36 sm:translate-y-3 md:h-60 md:w-60 md:translate-y-4">
        <Image src="/assets/images/logoIcon.svg" alt="로고 아이콘" fill />
      </div>
      <span className="text-logo-52 md:text-logo-52 sm:text-logo-31 text-black">FlowIt</span>
    </div>
  );
}
