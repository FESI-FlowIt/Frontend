import Image from 'next/image';

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
      <div>기능 이미지들의 배열</div>
    </div>
  );
}
