'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { LANDINGPAGEFEATUREDETAILS } from '@/constants/landingPageFeatures';
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
    <div className="flex flex-col items-center gap-240">
      {LANDINGPAGEFEATUREDETAILS.map((detail, index) => {
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
              `flex transform gap-120 transition-all duration-700 ease-out ${delayClasses[index % delayClasses.length]}`,
              {
                'ml-124 flex-row-reverse': isOdd,
                'flex-row': !isOdd,
              },
              {
                'translate-y-0 opacity-100': isVisible,
                'translate-y-16 opacity-0': !isVisible,
              },
            )}
          >
            <Image src={detail.imgUrl} alt={detail.name} width={700} height={700} />
            <div className="mt-80 flex flex-col gap-40">
              <span className="text-banner-44-bold text-text-01">{detail.name}</span>
              <div className="text-text-03 text-display-24 flex flex-col gap-24">
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
