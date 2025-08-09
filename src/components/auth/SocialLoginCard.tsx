'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';

import { ROUTES } from '@/lib/routes';

import { Button } from '../ui/Button';
interface ProvidersInterface {
  name: string;
  icon: string;
}

const CLOUDFRONT_URL = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_IMAGE_URL}`;

const providers: ProvidersInterface[] = [
  { name: 'kakao', icon: `${CLOUDFRONT_URL}/assets/images/login_kakao-logo.svg` },
] as const;

const KAKAO_AUTH_URL =
  'https://kauth.kakao.com/oauth/authorize' +
  `?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}` +
  `&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}` +
  '&response_type=code';

export default function SocialLoginCard({ mode }: { mode: 'login' | 'signUp' }) {
  const router = useRouter();
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div
      className={clsx(
        'flex flex-col items-center',
        mode === 'login' && 'gap-40 sm:gap-24 md:gap-40',
        mode === 'signUp' && 'gap-24',
      )}
    >
      <div className="flex w-full gap-10">
        {providers.map(
          ({ name, icon }) =>
            icon && (
              <Button
                key={name}
                onClick={handleKakaoLogin}
                disabled={false}
                variant="kakao"
                size="auth"
                text="secondary"
                className="gap-10"
              >
                <Image src={icon} alt={`${name} 로고 이미지`} width={19} height={19} />
                {mode === 'login' && '카카오 로그인'}
                {mode === 'signUp' && '카카오 회원가입'}
              </Button>
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
