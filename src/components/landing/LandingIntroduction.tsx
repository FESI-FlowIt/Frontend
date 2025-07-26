import Image from 'next/image';

import { LANDINGPAGEFEATURES } from '@/constants/landingPageFeatures';

export default function LandingIntroduction() {
  return (
    <div>
      <div>
        <Image src="/assets/landing_img.svg" alt="랜딩페이지 이미지" width={360} height={360} />
        <span>
          <span>목표</span>를 체계적으로 관리하고 성취하는법
        </span>
        <span>FlowIt은 작업 패턴 분석을 통해 개인의 생산성을 극대화하는 서비스 입니다.</span>
      </div>
      <div>
        {LANDINGPAGEFEATURES.map(feature => (
          <div key={feature.name}>
            <Image src={feature.imgUrl} alt={feature.name} width={200} height={200} />
            <span>{feature.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
