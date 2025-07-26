import Image from 'next/image';

import { LANDINGPAGEFEATUREDETAILS } from '@/constants/landingPageFeatures';
import { cn } from '@/lib/utils';

export default function LandingFeaturesDetail() {
  return (
    <div>
      {LANDINGPAGEFEATUREDETAILS.map((detail, index) => {
        const isOdd = index % 2 === 1;

        return (
          <div key={detail.name} className={cn('flex', isOdd ? 'flex-row-reverse' : 'flex-row')}>
            <Image src={detail.imgUrl} alt={detail.name} width={900} height={700} />
            <div>
              <span>{detail.name}</span>
              <div>
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
