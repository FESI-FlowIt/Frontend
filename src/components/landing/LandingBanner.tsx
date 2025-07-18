import Image from 'next/image';

import { Button } from '../ui/Button';

export default function LandingBanner() {
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
          <Button variant="secondary" text="secondary">
            로그인
          </Button>
          <Button variant="secondary" text="secondary">
            회원가입
          </Button>
        </div>
      </div>
      <div className="">
        <Image src="/assets/images/landing_img.svg" alt="배너 이미지" width={569} height={569} />
      </div>
    </div>
  );
}
