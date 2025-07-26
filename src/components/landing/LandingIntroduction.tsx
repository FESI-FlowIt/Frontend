import Image from 'next/image';

import { LANDINGPAGEFEATURES } from '@/constants/landingPageFeatures';
import { cn } from '@/lib/utils';

export default function LandingIntroduction() {
  return (
    <div className="flex flex-col items-center gap-96">
      <div className="flex flex-col items-center gap-36">
        <Image
          src="/assets/images/landing_img.svg"
          alt="랜딩페이지 이미지"
          width={360}
          height={360}
        />
        <div className="text-banner-44-bold text-text-01 text-center leading-52">
          <span className="text-primary-01">목표</span>를 체계적으로
          <br /> 관리하고 성취하는 법
        </div>
        <span className="text-text-02 text-display-24">
          FlowIt은 작업 패턴 분석을 통해 개인의 생산성을 극대화하는 서비스 입니다.
        </span>
      </div>

      <div className="flex items-center gap-20">
        {LANDINGPAGEFEATURES.map(feature => {
          return (
            <div
              key={feature.name}
              className={cn(
                `rounded-20 flex h-400 w-365 flex-col items-center justify-center gap-36 ${feature.bgColor}`,
              )}
            >
              <Image src={feature.imgUrl} alt={feature.name} width={200} height={200} />
              <span className="text-text-02 text-display-24">{feature.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
