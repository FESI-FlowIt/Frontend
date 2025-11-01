'use client';
import ErrorFallback from '@/components/ui/ErrorFallback';

export default function ClientErrorPage() {
  return (
    <div className="bg-background flex h-screen w-screen items-center justify-center">
      <ErrorFallback
        type="notFound"
        title="페이지를 찾을 수 없어요"
        subTitle="요청하신 페이지가 존재하지 않습니다"
        primaryLabel="홈으로"
        secondaryLabel="이전 페이지"
        onNavigate={() => (window.location.href = '/')}
        navigateHref="/"
      />
    </div>
  );
}
