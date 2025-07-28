'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/utils';

import { Button } from '../ui/Button';

export default function LandingBanner() {
  const router = useRouter();
  const btnRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [btnInView, setBtnInView] = useState(false);
  const [imgInView, setImgInView] = useState(false);

  useEffect(() => {
    const createObserver = (
      ref: React.RefObject<HTMLElement | null>,
      setInView: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      return new IntersectionObserver(
        ([entry]) => {
          setInView(entry.isIntersecting);
        },
        { threshold: 0.3 },
      );
    };

    const leftObserver = createObserver(btnRef, setBtnInView);
    const rightObserver = createObserver(imgRef, setImgInView);

    if (btnRef.current) leftObserver.observe(btnRef.current);
    if (imgRef.current) rightObserver.observe(imgRef.current);

    return () => {
      leftObserver.disconnect();
      rightObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-primary-01 flex h-620 items-center justify-center gap-189">
      <div
        ref={btnRef}
        className={cn('flex transform flex-col gap-42 transition-all duration-1000 ease-out', {
          'translate-x-0 opacity-100': btnInView,
          '-translate-x-50 opacity-0': !btnInView,
        })}
      >
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

      <div
        ref={imgRef}
        className={cn(
          'relative flex transform items-center justify-center transition-all duration-1000 ease-out',
          {
            'translate-x-0 opacity-100': imgInView,
            'translate-x-50 opacity-0': !imgInView,
          },
        )}
      >
        <div className="rounded-tl-50 rounded-bl-50 bg-landing-blue absolute h-343 w-850 -translate-x-[2%]" />
        <Image
          src="/assets/images/dashboard.svg"
          alt="대쉬보드 이미지"
          width={699.78}
          height={399.88}
          className="relative z-10"
        />
      </div>
    </div>
  );
}
