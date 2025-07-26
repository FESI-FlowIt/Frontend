'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/routes';

import { Button } from '../ui/Button';

export default function LandingBanner() {
  const router = useRouter();

  return (
    <div className="bg-primary-01 flex h-620 items-center justify-center gap-189">
      <div className="flex flex-col gap-42">
        <div className="bg-text-01 p-6.67 rounded-12 flex h-80 w-80 items-center justify-center">
          <Image src="/assets/images/logoIcon.svg" alt="로고 아이콘" width={66.67} height={66.67} />
        </div>
        <div className="mb-10">
          <span className="text-banner-44 text-white">
            목표 중심의
            <br /> 스마트한 생산성 관리, <span className="text-banner-44-bold">FlowIt</span>
          </span>
        </div>
        <div className="flex gap-20">
          <Button
            variant="secondary"
            text="secondary"
            disabled={false}
            onClick={() => router.push(ROUTES.AUTH.LOGIN)}
          >
            로그인
          </Button>
          <Button
            variant="secondary"
            text="secondary"
            disabled={false}
            onClick={() => router.push(ROUTES.AUTH.SIGNUP)}
          >
            회원가입
          </Button>
        </div>
      </div>
      <div className="">
        <Image
          src="/assets/images/dashboard.svg"
          alt="대쉬보드 이미지"
          width={699.78}
          height={399.88}
        />
      </div>
    </div>
  );
}
