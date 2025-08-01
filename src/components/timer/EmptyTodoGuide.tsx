// components/empty/EmptyTodoGuide.tsx
'use client';

import EmptyIcon from '@/assets/icons/timer.svg';

export default function EmptyTodoGuide() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <EmptyIcon className="text-primary-01" width={80} height={80} fill="currentColor" />
      <div className="mt-16">
        <p className="text-body-sb-20 text-text-02">할 일이 없어요!</p>
        <p className="text-body-sb-20 text-text-02 mt-12">
          할 일을 생성하면 작업 시간 측정이 가능해요
        </p>
      </div>
    </div>
  );
}
