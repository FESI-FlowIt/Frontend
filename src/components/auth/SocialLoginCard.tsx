'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import google from '../../../public/assets/images/googleLogo.svg';
import kakao from '../../../public/assets/images/kakaoLogo.svg';
import naver from '../../../public/assets/images/naverLogo.svg';

export default function SocialLoginCard({ mode }: { mode: 'login' | 'signUp' }) {
  const router = useRouter();

  const providers = [
    { name: 'naver', icon: naver },
    { name: 'kakao', icon: kakao },
    { name: 'google', icon: google },
  ];

  //ToDo: 소셜로그인 api가 나오면 post 요청 및 router 설정
  const handleNavigation = (provider: 'google' | 'kakao' | 'naver') => {
    router.push(`/${provider}`);
  };

  return mode === 'login' ? (
    <div className="flex flex-col items-center sm:gap-24 md:gap-40 lg:gap-40">
      <div className="flex gap-20">
        {providers.map(({ name, icon }) => (
          <div
            key={name}
            onClick={() => handleNavigation(name as 'naver' | 'kakao' | 'google')}
            className="relative sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-52 lg:w-52"
          >
            <Image src={icon} alt={`${name} 로고 이미지`} fill />
          </div>
        ))}
      </div>
      <span className="text-body-16 flex gap-4">
        FlowIt이 처음이신가요?
        <span
          onClick={() => router.push('/auth/signUp')}
          className="text-primary-01 cursor-pointer underline"
        >
          회원가입
        </span>
      </span>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-24">
      <span className="text-body-sb-20 text-text-04">간편 회원가입</span>
      <div className="flex gap-20">
        {providers.map(({ name, icon }) => (
          <div
            key={name}
            onClick={() => handleNavigation(name as 'naver' | 'kakao' | 'google')}
            className="relative sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-52 lg:w-52"
          >
            <Image src={icon} alt={`${name} 로고 이미지`} fill />
          </div>
        ))}
      </div>
    </div>
  );
}
