'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { LANDINGPAGEFEATURES } from '@/constants/landingPageFeatures';
import { cn } from '@/lib/utils';

const CLOUDFRONT_URL = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_IMAGE_URL}`;

export default function LandingIntroduction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center sm:gap-100 md:gap-90 lg:gap-97">
      <div className="flex flex-col items-center sm:gap-24 md:gap-36 lg:gap-36">
        <div className="relative sm:h-200 sm:w-200 md:h-280 md:w-280 lg:h-360 lg:w-360">
          <Image
            src={`${CLOUDFRONT_URL}/assets/images/landing_img.svg`}
            alt="랜딩페이지 이미지"
            fill
          />
        </div>
        <div className="lg:text-banner-44-bold md:text-display-32 sm:text-display-24 text-text-01 text-center lg:leading-52">
          <span className="text-primary-01">목표</span>를 체계적으로
          <br /> 관리하고 성취하는 법
        </div>
        <div className="text-text-02 lg:text-display-24 md:text-body-sb-20 sm:text-body-m-16 flex text-center sm:flex-col md:flex-row">
          <span className="sm:mr-0 md:mr-0 lg:mr-8">FlowIt은 작업 패턴 분석을 통해 </span>
          <span>개인의 생산성을 극대화하는 서비스 입니다.</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="md:grid-row-2 sm:grid-row-2 items-center gap-20 sm:grid sm:grid-cols-2 sm:gap-4 md:grid md:grid-cols-2 md:gap-20 lg:flex"
      >
        {LANDINGPAGEFEATURES.map((feature, index) => {
          const delayClasses = ['delay-0', 'delay-150', 'delay-300', 'delay-450'];
          return (
            <div
              key={feature.name}
              className={cn(
                `rounded-20 flex h-360 w-325 flex-col items-center justify-center gap-36 sm:h-190 sm:w-172 sm:gap-12 md:h-360 md:w-325 md:gap-36 ${feature.bgColor} ${delayClasses[index]} transform transition-all duration-700 ease-out`,
                {
                  'translate-y-0 opacity-100': inView,
                  'translate-y-30 opacity-0': !inView,
                },
              )}
            >
              <div className="relative h-200 w-200 sm:h-100 sm:w-100 md:h-200 md:w-200">
                <Image src={feature.imgUrl} alt={feature.name} fill />
              </div>
              <span className="text-text-02 text-display-24 md:text-display-24 sm:text-body-m-16">
                {feature.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
