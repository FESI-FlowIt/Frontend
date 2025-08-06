'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { LANDINGPAGE_FEATURE_DETAILS } from '@/constants/landingPageFeatures';
import { cn } from '@/lib/utils';

export default function LandingFeaturesDetail() {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    containerRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleIndexes(prev => {
            if (entry.isIntersecting) {
              if (!prev.includes(index)) return [...prev, index];
              return prev;
            } else {
              if (prev.includes(index)) return prev.filter(i => i !== index);
              return prev;
            }
          });
        },
        { threshold: 0.3 },
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <div className="flex flex-col items-center sm:gap-100 md:gap-160 lg:gap-240">
      {LANDINGPAGE_FEATURE_DETAILS.map((detail, index) => {
        const isOdd = index % 2 === 1;
        const isVisible = visibleIndexes.includes(index);
        const delayClasses = ['delay-0', 'delay-100', 'delay-200', 'delay-300', 'delay-400'];

        return (
          <div
            key={detail.name}
            ref={el => {
              containerRefs.current[index] = el;
            }}
            className={cn(
              `flex transform transition-all duration-700 ease-out sm:flex-col sm:gap-40 md:flex-col md:gap-64 lg:flex-row lg:gap-120 ${delayClasses[index % delayClasses.length]}`,
              {
                'lg:ml-124 lg:flex-row-reverse': isOdd,
                'lg:flex-row': !isOdd,
              },
              {
                'translate-y-0 opacity-100': isVisible,
                'translate-y-16 opacity-0': !isVisible,
              },
            )}
          >
            <div className="relative sm:h-263 sm:w-338 md:h-525 md:w-525 lg:h-700 lg:w-700">
              <Image src={detail.imgUrl} alt={detail.name} fill />
            </div>
            <div className="flex flex-col gap-40 sm:mt-0 sm:gap-24 md:mt-0 md:gap-40 lg:mt-80">
              <span className="text-banner-44-bold md:text-banner-44-bold sm:text-display-24 text-text-01">
                {detail.name}
              </span>
              <div className="text-text-03 text-display-24 md:text-display-24 sm:text-body-b-16 flex flex-col gap-24 sm:gap-12 md:gap-24">
                {detail.contents.map(content => (
                  <span key={content.name}>{content.name}</span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
