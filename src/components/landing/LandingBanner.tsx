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
    <div className="bg-primary-01 flex h-620 items-center sm:flex-col sm:justify-center sm:gap-30 md:flex-row md:justify-between md:gap-30 md:pl-32 lg:justify-center lg:gap-140">
      <div
        ref={btnRef}
        className={cn(
          'flex transform flex-col transition-all duration-1000 ease-out sm:gap-24 md:gap-32 lg:gap-42',
          {
            'translate-x-0 opacity-100': btnInView,
            '-translate-x-10 opacity-0': !btnInView,
          },
        )}
      >
        <div className="bg-text-01 p-6.67 rounded-12 flex items-center justify-center sm:h-40 sm:w-40 md:h-40 md:w-40 lg:h-80 lg:w-80">
          <div className="relative sm:h-33 sm:w-33 md:h-33 md:w-33 lg:h-67 lg:w-67">
            <Image src="/assets/images/logoIcon.svg" alt="로고 아이콘" fill />
          </div>
        </div>
        <div className="sm:mb-0 md:mb-0 lg:mb-10">
          <span className="lg:text-banner-44 md:text-banner-24 sm:text-banner-24 flex text-white sm:flex-col md:flex-col lg:block">
            목표 중심의
            <br /> 스마트한 생산성 관리,{' '}
            <span className="lg:text-banner-44-bold md:text-logo-32 sm:text-logo-32">FlowIt</span>
          </span>
        </div>
        <div className="flex sm:gap-12 md:gap-12 lg:gap-20">
          <Button
            variant="secondary"
            text="secondary"
            disabled={false}
            onClick={() => router.push(ROUTES.AUTH.LOGIN)}
            className="sm:h-44 sm:w-118 md:h-44 md:w-118 lg:h-62 lg:w-240"
          >
            로그인
          </Button>
          <Button
            variant="secondary"
            text="secondary"
            disabled={false}
            onClick={() => router.push(ROUTES.AUTH.SIGNUP)}
            className="sm:h-44 sm:w-118 md:h-44 md:w-118 lg:h-62 lg:w-240"
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
            '-translate-x-10 opacity-0': !imgInView,
          },
        )}
      >
        <div className="rounded-tl-50 rounded-bl-50 bg-landing-blue absolute sm:hidden md:block md:h-240 md:w-400 md:-translate-x-[5%] lg:block lg:h-343 lg:w-1045 lg:translate-x-[8%]" />
        <div className="relative z-10 sm:h-194 sm:w-340 md:h-206 md:w-361 lg:h-400 lg:w-700">
          <Image src="/assets/images/dashboard.svg" alt="대쉬보드 이미지" fill />
        </div>
      </div>
    </div>
  );
}
