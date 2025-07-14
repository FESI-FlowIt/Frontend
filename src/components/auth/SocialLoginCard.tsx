'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import google from '../../../public/assets/images/googleLogo.svg';
import kakao from '../../../public/assets/images/kakaoLogo.svg';
import naver from '../../../public/assets/images/naverLogo.svg';

export default function SocialLoginCard() {
  const router = useRouter();

  //ToDo: 소셜로그인 api가 나오면 post 요청 및 router 설정
  const handleNavigation = (provider: 'google' | 'kakao' | 'naver') => {
    router.push(`/${provider}`);
  };

  return (
    <div className="flex gap-20">
      <div
        onClick={() => handleNavigation('naver')}
        className="relative sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-52 lg:w-52"
      >
        <Image src={naver} alt="네이버 로고 이미지" fill />
      </div>
      <div
        onClick={() => handleNavigation('kakao')}
        className="relative sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-52 lg:w-52"
      >
        <Image src={kakao} alt="카카오 로고 이미지" fill />
      </div>
      <div
        onClick={() => handleNavigation('google')}
        className="relative sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-52 lg:w-52"
      >
        <Image src={google} alt="구글 로고 이미지" fill />
      </div>
    </div>
  );
}
