import Image from 'next/image';

import { LANDINGPAGEFEATUREDETAILS } from '@/constants/landingPageFeatures';
import { cn } from '@/lib/utils';

export default function LandingFeaturesDetail() {
  return (
    <div className="flex flex-col items-center gap-240">
      {LANDINGPAGEFEATUREDETAILS.map((detail, index) => {
        const isOdd = index % 2 === 1;

        return (
          <div
            key={detail.name}
            className={cn('flex gap-120', isOdd ? 'ml-124 flex-row-reverse' : 'flex-row')}
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
