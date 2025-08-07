'use client';

import { Suspense, useEffect, useRef } from 'react';

import { useSearchParams } from 'next/navigation';

import CustomLoading from '@/components/ui/CustomLoading';
import useSocialLogin from '@/hooks/auth/useSocialLogin';

function OAuthCallbackPage() {
  const searchParams = useSearchParams();
  const hasRequested = useRef(false);

  const socialLogin = useSocialLogin();

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      alert('인가 코드가 없습니다.');
      return;
    }

    if (hasRequested.current) return;
    hasRequested.current = true;

    socialLogin.mutate({ code });
  }, [searchParams, socialLogin]);

  return socialLogin.isPending ? <CustomLoading /> : null;
}

export default function Page() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <OAuthCallbackPage />
    </Suspense>
  );
}
