'use client';

import { useEffect, useMemo } from 'react';

import { useRouter } from 'next/navigation';

import ErrorFallback from '@/components/ui/ErrorFallback';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const target = useMemo(() => {
    const code = (error as any)?.statusCode ?? (error as any)?.status;
    if (typeof code !== 'number') return null;
    if (code >= 500 && code < 600) return '/error/500error';
    if (code >= 400 && code < 500) return '/error/400error';
    return null;
  }, [error]);

  useEffect(() => {
    if (target) router.replace(target);
  }, [target, router]);

  return (
    <html suppressHydrationWarning>
      <body className="bg-muted/30 flex min-h-dvh items-center justify-center">
        {target ? null : (
          <ErrorFallback
            type="general"
            title="문제가 발생했어요"
            subTitle="잠시 후 다시 시도해 주세요."
            primaryLabel="다시 시도"
            onRetry={reset}
            secondaryLabel="홈으로"
            onNavigate={() => router.push('/')}
          />
        )}
      </body>
    </html>
  );
}
