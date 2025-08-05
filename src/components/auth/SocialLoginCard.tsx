'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';

import { ROUTES } from '@/lib/routes';
interface ProvidersInterface {
  name: string;
  icon: string;
}

const CLOUDFRONT_URL = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_IMAGE_URL}`;

const providers: ProvidersInterface[] = [
  { name: 'naver', icon: `${CLOUDFRONT_URL}/assets/images/login_naver-logo.svg` },
  { name: 'kakao', icon: `${CLOUDFRONT_URL}/assets/images/login_kakao-logo.svg` },
  { name: 'google', icon: `${CLOUDFRONT_URL}/assets/images/login_google-logo.svg` },
];

export default function SocialLoginCard({ mode }: { mode: 'login' | 'signUp' }) {
  const router = useRouter();

  //TODO: 소셜로그인 api가 나오면 post 요청 및 router 설정
  const handleNavigation = (provider: 'google' | 'kakao' | 'naver') => {
    router.push(`/${provider}`);
  };

  return (
    <div
      className={clsx(
        'flex flex-col items-center',
        mode === 'login' && 'gap-40 sm:gap-24 md:gap-40',
        mode === 'signUp' && 'gap-24',
      )}
    >
      {mode === 'signUp' && <span className="text-body-sb-20 text-text-04">간편 회원가입</span>}
      <div className="flex gap-20">
        {providers.map(
          ({ name, icon }) =>
            icon && (
              <div
                key={name}
                onClick={() => handleNavigation(name as 'naver' | 'kakao' | 'google')}
                className="relative h-52 w-52 cursor-pointer sm:h-44 sm:w-44 md:h-52 md:w-52"
              >
                <Image
                  src={icon}
                  alt={`${name} 로고 이미지`}
                  fill
                  sizes="(max-width: 768px) 40px, (max-width: 1200px) 52px, 52px"
                />
              </div>
            ),
        )}
      </div>
      {mode === 'login' && (
        <span className="text-body-16 flex gap-4">
          FlowIt이 처음이신가요?
          <span
            onClick={() => router.push(ROUTES.AUTH.SIGNUP)}
            className="text-primary-01 cursor-pointer underline"
          >
            회원가입
          </span>
        </span>
      )}
    </div>
  );
}
