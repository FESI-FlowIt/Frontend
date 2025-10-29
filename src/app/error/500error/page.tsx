'use client';
import ErrorFallback from '@/components/ui/ErrorFallback';

export default function ServerErrorPage() {
  return (
    <div className="bg-background flex h-screen w-screen items-center justify-center">
      <ErrorFallback
        type="general"
        title="문제가 발생했어요"
        subTitle="잠시 후 다시 시도해 주세요"
        primaryLabel="다시 시도"
        secondaryLabel="홈으로"
        onNavigate={() => (window.location.href = '/')}
        navigateHref="/"
      />
    </div>
  );
}
