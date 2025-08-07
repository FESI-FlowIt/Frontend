'use client';

import { useEffect, useRef } from 'react';

import { useSearchParams } from 'next/navigation';

import CustomLoading from '@/components/ui/CustomLoading';
import useSocialLogin from '@/hooks/auth/useSocialLogin';

export default function OAuthCallbackPage() {
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

  if (socialLogin.isPending) {
    return <CustomLoading />;
  }

  return null;
}
